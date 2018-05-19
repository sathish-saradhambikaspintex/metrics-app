import { map, xprod } from "ramda";

export default function getCellRendererParams({
	visibleRowRange,
	visibleColumnRange,
	rowSizeAndPositionManager,
	columnSizeAndPositionManager,
}) {
	const styleCache = {};
	const getParams = ([rowIndex, columnIndex]) => {
		let rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfIndex(rowIndex);
		let columnDatum = columnSizeAndPositionManager.getSizeAndPositionOfIndex(columnIndex);
		let key = `${rowIndex}-${columnIndex}`;
		let style;

		// Cache style objects so shallow-compare doesn't re-render unnecessarily.
		if (styleCache[key]) {
			style = styleCache[key];
		} else {
			style = {
				height: rowDatum.size,
				left: columnDatum.offset,
				position: "absolute",
				top: rowDatum.offset,
				width: columnDatum.size,
			};

			styleCache[key] = style;
		}

		return {
			key,
			style,
			rowIndex,
			columnIndex,
		};
	};

	const keys = xprod(visibleRowRange, visibleColumnRange);
	return map(getParams, keys);
}
