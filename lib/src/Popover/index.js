import React, { Component, Fragment } from "react";
import getPopper from "./getPopper";
import getTarget from "./getTarget";
import { assoc, head, last } from "ramda";

class Popover extends Component {
	static displayName = "HO.Popover";
	static defaultProps = {
		placement: "bottom-end",
		eventsEnabled: true,
		modifiers: {},
		canClickOutside: false,
		hover: false,
	};
	state = { isOpen: false };
	setTargetRef = ref => (this.targetNode = ref);
	setPopperRef = ref => (this.popperNode = ref);
	setIsOpen = state => this.setState(assoc("isOpen", state));
	setOutsideClickListener = shouldSet => {
		const { hover, canClickOutside } = this.props;
		if (!hover && !canClickOutside) {
			if (shouldSet) {
				document.addEventListener("click", this.handleClick);
			} else {
				document.removeEventListener("click", this.handleClick);
			}
		}
	};

	constructor() {
		super();
		this.handleTargetClick = this.handleTargetClick.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}
	componentDidUpdate() {
		if (this.state.isOpen) {
			this.setOutsideClickListener(true);
		} else {
			this.setOutsideClickListener(false);
		}
	}
	componentWillUnmount() {
		this.setOutsideClickListener(false);
	}
	render() {
		return (
			<Fragment>
				{this.renderTargetNode()}
				{this.renderContentNode()}
			</Fragment>
		);
	}
	renderTargetNode() {
		const { children, hover, disabled } = this.props;
		const target = head(children);
		return getTarget(target, {
			onMouseEnter: hover && !disabled ? this.handleMouseEnter : undefined,
			onMouseLeave: hover && !disabled ? this.handleMouseLeave : undefined,
			onClick: !hover && !disabled ? this.handleTargetClick : undefined,
			innerRef: this.setTargetRef,
		});
	}
	renderContentNode() {
		const { isOpen } = this.state;
		if (!isOpen) return null;

		const { children, hover, disabled, ...restProps } = this.props;
		const content = last(children);
		return getPopper(content, {
			...restProps,
			targetRef: this.targetNode,
			innerRef: this.setPopperRef,
			onMouseEnter: hover && !disabled ? this.handleMouseEnter : undefined,
			onMouseLeave: hover && !disabled ? this.handleMouseLeave : undefined,
		});
	}

	// EVENTS
	handleTargetClick() {
		this.setIsOpen(!this.state.isOpen);
	}
	handleClick(event) {
		const { canClickOutside } = this.props;
		const target = event.target;
		if (this.targetNode && !canClickOutside) {
			const isClickInPopper = this.popperNode && this.popperNode.contains(target);
			const canDismissPopper = target.dataset.dismiss === "true";
			const isClickInTarget = this.targetNode.contains(target);

			if (isClickInTarget) return;

			event.stopPropagation();
			if (isClickInPopper && canDismissPopper) {
				return this.setIsOpen(false);
			} else if (!isClickInPopper) {
				return this.setIsOpen(false);
			}
		}
	}
	handleMouseEnter() {
		this.setIsOpen(true);
	}
	handleMouseLeave() {
		this.setIsOpen(false);
	}
}

export default Popover;
