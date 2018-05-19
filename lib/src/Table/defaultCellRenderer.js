import React from "react";
import { is } from "ramda";
import styled from "styled-components";

const Cell = styled.div.attrs({
	role: "gridcell",
})`
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export default function(params) {
	const { columnIndex, rowIndex, key, render, style } = params;
	const renderedCell = render(rowIndex);
	const title = is(String, renderedCell) ? renderedCell : null;
	const isFirst = columnIndex === 0;

	return (
		<Cell data-key={key} key={key} title={title} style={style} isFirst={isFirst}>
			{renderedCell}
		</Cell>
	);
}
