import React from "react";
import { addIndex, map, flip, call, pathOr, prop, compose, append, isNil, flatten, __ } from "ramda";

const mapIndexed = addIndex(map);
const flippedCall = flip(call);
const getBsonType = prop("bsonType");
const getValidators = prop("validator");
const getValue = prop("value");
const validateData = props => {
	const value = getValue(props);
	const validators = getValidators(props);

	if (isNil(value)) return [];
	return map(flippedCall(value), validators);
};
const renderErrorText = (err, idx) => <div key={`error-${idx}`}>{err}</div>;
const renderError = compose(mapIndexed(renderErrorText), validateData);

export default function(props) {
	const type = getBsonType(props);
	let errors = renderError(props);

	if (type === "array") {
		const value = getValue(props);
		if (isNil(value)) {
			errors = append([], errors);
		} else {
			const validator = pathOr([], ["items", "validator"], props);
			const newProps = map(value => ({ validator, value }), value);
			errors = compose(append(__, errors), flatten, map(renderError))(newProps);
		}
	}

	return errors;
}
