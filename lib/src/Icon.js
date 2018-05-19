import React from "react";
import { is, toUpper, merge } from "ramda";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const isString = is(String);
const Icon = props => {
	const { style, large = false, children, text, color, ...other } = props;
	let textIcon = null;
	if (children || text) {
		if (!isString(children || text)) throw new Error("text or children prop must be of string type");
		textIcon = toUpper(children || text);
	}

	let mergedStyle = { ...style, color: color || "inherit" };
	const textIconStyle = { fontWeight: 500, width: 30, textAlgn: "center" };
	if (textIcon) mergedStyle = merge(mergedStyle, textIconStyle);
	return (
		<FontAwesomeIcon style={mergedStyle} size={large ? "lg" : undefined} {...other}>
			{textIcon}
		</FontAwesomeIcon>
	);
};

Icon.displayName = "HO.Icon";
export default Icon;
