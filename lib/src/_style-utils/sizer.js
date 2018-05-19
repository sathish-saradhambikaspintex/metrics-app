// style-utils.js
import { equals } from "ramda";
const isLarge = equals("large");
const isSmall = equals("small");

function truncateText() {
	return `
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	`;
}

function sizeElement(size, basePx = 10) {
	if (isLarge(size)) {
		return `
			min-width: ${basePx * 20 / 5}px;
			min-height: ${basePx * 20 / 5}px;
			line-height: ${8 / 5};
			font-size: 16px;
			padding-left: ${basePx * 8 / 5}px;
			padding-right: ${basePx * 8 / 5}px;
		`;
	}

	if (isSmall(size)) {
		return `
			min-width: ${basePx * 12 / 5}px;
			min-height: ${basePx * 12 / 5}px;
			line-height: ${6 / 5};
			font-size: 12px;
			padding-left: ${basePx * 6 / 5}px;
			padding-right: ${basePx * 6 / 5}px;
		`;
	}

	return `
		min-width: ${basePx * 15 / 5}px;
		min-height: ${basePx * 15 / 5}px;
		line-height: ${7 / 5};
		font-size: 14px;
		padding-left: ${basePx * 7 / 5}px;
		padding-right: ${basePx * 7 / 5}px;
	`;
}

export default function sizer(size, truncate, basePx) {
	if (truncate) {
		return `
			${sizeElement(size, basePx)}
			${truncateText()}
		`;
	}
	return sizeElement(size, basePx);
}
