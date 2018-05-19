// style-utils.js
import tc from "tinycolor2";
import { is, last } from "ramda";

export default function(color, withoutPseudoSelector) {
	if (is(Array, color)) color = last(color);
	const bgColor = tc(color)
		.lighten(60)
		.toRgbString();
	const styles = `
		outline : none!important;
		resize: none!important;
		box-shadow: none!important;
		cursor: not-allowed!important;
		color: ${color}!important;
		background: ${bgColor}!important;
		background-image: none!important;
	`;

	if (withoutPseudoSelector) return styles;
	return `
		&:disabled {
			${styles}
		}
	`;
}
