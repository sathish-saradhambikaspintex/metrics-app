import React from "react";

const defaultCellRenderer = ({ key, style, rowIndex, columnIndex }) => (
	<div data-key={key} key={key} style={style}>
		{`r:${rowIndex}, c:${columnIndex}`}
	</div>
);

export default defaultCellRenderer;
