import tc from "tinycolor2";

const getAlphaColor = color => alpha =>
	tc(color)
		.setAlpha(alpha)
		.toHex();

export default function({ h = "0", v = "0", blur = "0", spread = "0", color = "#10161A", alpha = 1 }) {
	const getAlpha = getAlphaColor(color);
	const firstSpread = `0px 0px 0px 1px ${getAlpha(0.15)}`;
	return `
		box-shadow : ${h}px ${v}px ${blur}px ${spread}px ${colorLevel};
		&:hover {
			box-shadow: ${getBSFor(3)};
		}
	`;
}
