import React from "react";
import Tag from "./Tag";
import TagWrapper from "./StyledTagWrapper";

class MinimalTag extends Tag {
	static displayName = "HO.Tag.Minimal";
	render() {
		const { text, onClose, ...others } = this.props;
		return (
			<TagWrapper minimal {...others}>
				{this.renderTagLabel()}
				{this.renderCloseIcon()}
			</TagWrapper>
		);
	}
}

export default MinimalTag;
