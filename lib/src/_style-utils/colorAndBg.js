// style-utils.js
import tc from "tinycolor2";
import { last, head, is } from "ramda";

export default function colorAndBg(color, effect = "fg") {
	let fontColor, bgColor, bgHoverColor;
	if (is(Array, color)) {
		fontColor = head(color);
		bgColor = last(color);
	} else {
		fontColor = color;
		bgColor = color;
	}

	bgHoverColor = tc(bgColor)
		.darken(3)
		.toHexString();
	if (effect === "hoverOnly") {
		return `
			background: none;
			color: ${bgColor};
			&:hover {
				color: ${fontColor};
				background: ${bgHoverColor};
				background-clip: padding-box;
			}
		`;
	} else if (effect === "bg") {
		return `
			background: ${bgColor};
			color: ${fontColor};
			`;
	} else if (effect === "fg") {
		return `
			color: ${fontColor};
			`;
	} else if (effect === "hover") {
		return `
			color: ${fontColor};
			background: ${bgColor};
			&:hover {
				background: ${bgHoverColor};
				background-clip: padding-box;
			}
		`;
	}
}
