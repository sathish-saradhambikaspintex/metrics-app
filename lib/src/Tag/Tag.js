import { is } from "ramda";
import Icon from "../Icon";
import React, { Component } from "react";
import TagLabel from "./StyledTagLabel";
import TagWrapper from "./StyledTagWrapper";

class Tag extends Component {
	static displayName = "HO.Tag";
	render() {
		const { text, onClose, ...others } = this.props;
		return (
			<TagWrapper {...others}>
				{this.renderTagLabel()}
				{this.renderCloseIcon()}
			</TagWrapper>
		);
	}
	renderTagLabel() {
		const { text } = this.props;
		return <TagLabel>{text}</TagLabel>;
	}
	renderCloseIcon() {
		const { onClose } = this.props;
		const removable = onClose && is(Function, onClose);
		if (!removable) return null;
		return <Icon icon="close" style={{ position: "absolute", right: 6 }} onClick={onClose} />;
	}
}

export default Tag;
