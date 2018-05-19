import React, { Component, Fragment } from "react";
import Progress from "../Progress";
import Icon from "../Icon";
import StyledButton from "./StyledButton";
import { isNil, is } from "ramda";

class Button extends Component {
	static displayName = "HO.Button";
	setButtonRef = ref => {
		if (this.props.innerRef) this.props.innerRef(ref);
		this.button = ref;
	};

	render() {
		return <StyledButton {...this.getButtonProps()}>{this.renderChildren()}</StyledButton>;
	}
	renderChildren() {
		return (
			<Fragment>
				{this.renderLoadingSpinner()}
				{this.renderLeftIcon()}
				{this.renderCaption()}
				{this.renderRightIcon()}
			</Fragment>
		);
	}
	renderLoadingSpinner() {
		const { loading } = this.props;
		if (!loading) return null;

		const loadingStyle = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
		return <Progress style={loadingStyle} small />;
	}
	renderLeftIcon() {
		const { loading, icon, large } = this.props;
		if (loading) return null;
		if (isNil(icon)) return null;

		return <Icon large={large} icon={icon} />;
	}
	renderRightIcon() {
		const { loading, rightIcon, large } = this.props;
		if (loading) return null;
		if (isNil(rightIcon)) return null;

		return <Icon style={{ marginLeft: "auto" }} large={large} icon={rightIcon} />;
	}
	renderCaption() {
		const { icon, rightIcon, text, children, loading } = this.props;
		if (loading) return null;

		const caption = text || children;
		if (!caption) return null;

		if (!icon && !rightIcon) {
			return caption;
		} else if (icon && !rightIcon) {
			let style = { paddingLeft: 10 };
			if (!is(String, caption)) return React.cloneElement(caption, { style });
			return <span style={style}>{caption}</span>;
		} else if (!icon && rightIcon) {
			let style = { paddingRight: 10 };
			if (!is(String, caption)) return React.cloneElement(caption, { style });
			return <span style={style}>{caption}</span>;
		} else {
			let style = { paddingLeft: 10, paddingRight: 10 };
			if (!is(String, caption)) return React.cloneElement(caption, { style });
			return <span style={style}>{caption}</span>;
		}
	}
	getButtonProps() {
		const { disabled, loading, fill } = this.props;
		return {
			...this.props,
			fill: fill ? 1 : 0,
			disabled: disabled,
			innerRef: this.setButtonRef,
			onClick: disabled || loading ? undefined : this.handleButtonClick,
		};
	}

	// EVENTS
	handleButtonClick = event => {
		const { onClick } = this.props;

		if (onClick) {
			event.stopPropagation();
			return onClick(event);
		}
	};
}

export default Button;
