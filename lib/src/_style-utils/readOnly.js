// style-utils.js
import tc from "tinycolor2";

export default function(color) {
	const bgColor = tc(color)
		.lighten(60)
		.toRgbString();
	return `
			&:read-only {
				outline : none!important;
				resize: none!important;
				box-shadow: none!important;
				cursor: not-allowed!important;
				color: ${color}!important;
				background: ${bgColor}!important;
			}
	`;
}
