import PopperJS from "popper.js";
import React, { Component } from "react";
import { createPortal } from "react-dom";
import { compose, values, prop, is, always, propOr } from "ramda";
import PopperContainer from "./StyledContainer";

const isFn = is(Function);

class Popper extends Component {
	state = { data: null };
	updateStateModifier = {
		enabled: true,
		order: 900,
		fn: data => {
			const getStringifiedOffsets = compose(JSON.stringify, values, propOr(null, "offsets"));
			const oldDataOffsets = getStringifiedOffsets(this.state.data);
			const dataOffsets = getStringifiedOffsets(data);
			if (oldDataOffsets !== dataOffsets) this.setState({ data });
			return data;
		},
	};
	setPopperRef = node => {
		const { innerRef } = this.props;
		this.node = node;
		if (isFn(innerRef)) innerRef(node);
		if (node) return this.createPopper();
		return this.destroyPopper();
	};
	getTargetRef = () => prop("targetRef", this.props);
	getPopperStyle = () => {
		const { data } = this.state;
		// If Popper isn't instantiated, hide the popperElement
		// to avoid flash of unstyled content
		if (!data) return { position: "absolute", pointerEvents: "none", opacity: 0 };
		const { position } = data.offsets.popper;
		return { position, ...data.styles };
	};
	getPopperPlacement = () => propOr(undefined, "placement", this.state.data);
	getPopperHide = () => (!!this.state.data && this.state.data.hide ? "" : undefined);
	getArrowStyle = () => {
		const { data } = this.state;
		if (!data || !data.offsets.arrow) return {};
		const { top, left } = data.offsets.arrow;
		return { top, left };
	};
	createPopper = () => {
		const { placement, eventsEnabled, modifiers } = this.props;
		this.popper = new PopperJS(this.getTargetRef(), this.node, {
			placement,
			eventsEnabled,
			modifiers: {
				...modifiers,
				applyStyle: { enabled: false },
				updateState: this.updateStateModifier,
			},
		});
		this.updatePopper();
	};
	destroyPopper = this.popper ? this.popper.destroy : always;
	updatePopper = this.popper ? this.popper.scheduleUpdate : always;

	componentDidUpdate(lastProps) {
		const { placement, eventsEnabled, children } = lastProps;
		if (placement !== this.props.placement || eventsEnabled !== this.props.eventsEnabled) {
			this.destroyPopper();
			this.createPopper();
		}

		if (children !== this.props.children) this._popper.scheduleUpdate();
	}
	componentWillUnmount() {
		this.destroyPopper();
	}
	render() {
		const { modifiers, innerRef, placement, eventsEnabled, component, targetRef, ...restProps } = this.props;
		const props = {
			...restProps,
			innerRef: this.setPopperRef,
			style: { ...restProps.style, ...this.getPopperStyle() },
			"data-placement": this.getPopperPlacement(),
			"data-x-out-of-boundaries": this.getPopperHide(),
		};

		return createPortal(<PopperContainer {...props}>{component}</PopperContainer>, document.body);
	}
}

export default function getPopper(component, props) {
	return <Popper component={component} {...props} />;
}
