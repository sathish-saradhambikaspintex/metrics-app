import React from "react";
import { either, isEmpty, isNil, both, is } from "ramda";

const isEmptyOrNil = either(isEmpty, isNil);
const canBeRendered = both(React.isValidElement, is(String));
const defaultHeaderRenderer = ({ key, label, sortBy, sortDirection }) => {
	if (isEmptyOrNil(label)) label = "";

	if (canBeRendered(label)) {
		throw new Error(
			`The given header prop for column ${key} is not a valid react element`
		);
	}

	const showSortIndicator = sortBy === key;
	const children = [
		label ? (
			<span key="label" data-key="label">
				{label}
			</span>
		) : null,
		showSortIndicator ? (
			<span
				key="sort-indicator"
				data-key="sort-indicator"
				sortDirection={sortDirection}
			/>
		) : null,
	];
	return children;
};

export default defaultHeaderRenderer;
