// style-utils.js
import tc from "tinycolor2";
import { is, last } from "ramda";

export default function border(color, radius = 3) {
	if (is(Array, color)) color = last(color);

	if (!tc(color).isValid()) {
		return `
			border: 1px solid rgba(0,0,0,0);
			&:hover, &:focus {
				border: 1px solid rgba(0,0,0,0);
			}
		`;
	}

	const borderColor = (color = "rgba(0,0,0,0.5)");
	const borderFocusColor = tc(color)
		.darken(40)
		.toHexString();
	const borderHoverColor = tc(color)
		.darken(55)
		.toHexString();

	return `
		border-radius: ${radius}px;
		border: ${`1px solid ${borderColor}`};
		&:hover {
			border: ${`1px solid ${borderHoverColor}`};
		}
		&:focus {
			border: ${`1px solid ${borderFocusColor}`};
		}
		& input:disabled, & input:read-only {
			border: 1px solid rgba(0,0,0,0);
		}
	`;
}
