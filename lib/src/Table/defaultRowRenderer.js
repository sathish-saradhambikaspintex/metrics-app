import React from "react";
import styled from "styled-components";
import { isEmpty, isNil, is, allPass } from "ramda";

const isValidFunction = allPass([is(Function), isEmpty, isNil]);
const Row = styled.div.attrs({
	role: "row",
	"aria-label": "row",
	tabIndex: 0,
})`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid #e0e0e0;
	&:focus {
		outline-offset: -3px !important;
	}
`;

/**
 * Default row renderer for Table.
 */
export default function defaultRowRenderer({
	columns,
	index,
	key,
	onRowClick,
	onRowDoubleClick,
	onRowMouseOut,
	onRowMouseOver,
	onRowRightClick,
	rowData,
	style,
}) {
	const callFunction = fn => {
		if (isValidFunction(fn)) {
			return event => fn({ event, index, rowData });
		}
		return;
	};

	const props = {
		onClick: callFunction(onRowClick),
		onDoubleClick: callFunction(onRowDoubleClick),
		onMouseOut: callFunction(onRowMouseOut),
		onMouseOver: callFunction(onRowMouseOver),
		onContextMenu: callFunction(onRowRightClick),
	};

	return (
		<Row {...props} data-key={key} key={key} style={style}>
			{columns}
		</Row>
	);
}
