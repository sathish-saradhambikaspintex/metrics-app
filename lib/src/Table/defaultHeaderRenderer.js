import React from "react";
import styled, { css } from "styled-components";
import { isEmpty, isNil, either, is, both } from "ramda";

const isEmptyOrNil = either(isEmpty, isNil);
const canBeRendered = both(React.isValidElement, is(String));
const Header = styled.div.attrs({
	role: "columnheader",
	tabIndex: 0,
})`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	${({ showSortIndicator = false }) => {
		if (!showSortIndicator) return;
		return css`
			cursor: pointer;
		`;
	}};
`;
const SortIndicator = styled.span`
	flex: 0 0 24px;
	height: 1em;
	width: 1em;
	fill: currentColor;
`;
const Label = styled.span.attrs({
	children: props => props.label,
	title: props => props.label,
})`

`;

export default function defaultHeaderRenderer({
	key,
	label,
	sortBy,
	sortDirection,
	style,
}) {
	if (isEmptyOrNil(label)) label = "";

	if (canBeRendered(label)) {
		throw new Error(
			`The given header prop for column ${key} is not a valid react element`
		);
	}

	const showSortIndicator = sortBy === key;
	const children = [
		label ? <Label key="label" data-key="label" label={label} /> : null,
		showSortIndicator ? (
			<SortIndicator
				key="sort-indicator"
				data-key="sort-indicator"
				sortDirection={sortDirection}
			/>
		) : null,
	];

	return (
		<Header style={style} key={key} data-key={key} showSortIndicator={showSortIndicator}>
			{children}
		</Header>
	);
}
