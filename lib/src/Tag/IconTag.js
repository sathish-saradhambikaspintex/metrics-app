import Icon from "../Icon";
import React, { Component } from "react";

class IconTag extends Component {
	static displayName = "HO.Tag.Icon";
	render() {
		const { text, icon, iconText, style, ...others } = this.props;
		const styleAddons = {
			...style,
			border: "1px solid",
			borderRadius: "4px",
			padding: "5px",
			background: "gray",
			color: "white",
		};
		return (
			<div style={styleAddons} {...others}>
				{this.renderTagIcon()}
				{this.renderTagLabel()}
			</div>
		);
	}
	renderTagIcon() {
		const { icon, iconText } = this.props;
		const style = { textAlign: "center" };
		if (!icon) {
			return (
				<div style={style}>
					<Icon text={iconText} large />
				</div>
			);
		} else {
			return (
				<div style={style}>
					<Icon icon={icon} large />
				</div>
			);
		}
	}
	renderTagLabel() {
		const { text } = this.props;
		const style = { textAlign: "center", fontSize: 12, marginTop: 4, padding: "0 6px" };
		return <div style={style}>{text}</div>;
	}
}

export default IconTag;
