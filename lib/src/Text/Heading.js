import React from "react";
import { merge, prop } from "ramda";

const fontSizes = [2.25, 2, 1.75, 1.5, 1.25, 1, 0.75];
function Heading({ style, size = 5, text, children, ...props }) {
	const defaultStyle = {
		color: "inherit",
		fontFamily: "inherit",
		fontWeight: 500,
		fontSize: 10 * prop(size - 1, fontSizes),
	};
	return (
		<div style={merge(defaultStyle, style)} {...props}>
			{text || children}
		</div>
	);
}

Heading.displayName = "HO.Text.Heading";
export default Heading;
