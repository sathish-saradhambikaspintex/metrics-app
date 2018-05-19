import React from "react";
import Button from "./Button";
import StyledMinimalButton from "./StyledMinimalButton";

class MinimalButton extends Button {
	static displayName = "HO.Button.Minimal";

	render() {
		return <StyledMinimalButton {...this.getButtonProps()}>{this.renderChildren()}</StyledMinimalButton>;
	}
}

export default MinimalButton;
