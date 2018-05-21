import moment from "moment";
import {
	compose,
	length,
	is,
	prop,
	ifElse,
	flip,
	call,
	uniq,
	test,
	gte,
	propOr,
	gt,
	lte,
	converge,
	assoc,
	lt,
	both,
	always,
	props,
	map,
} from "ramda";

const checkStringLength = scheme => {
	const [min = 0, max = Infinity] = props(["minLength", "maxLength"], scheme);
	const gteMin = flip(gte)(min);
	const lteMax = flip(lte)(max);
	return ifElse(
		compose(both(gteMin, lteMax), length),
		always(null),
		always(`String must be between ${min} and ${max} characters only`)
	);
};
const checkPattern = scheme => {
	const regex = compose(d => new RegExp(d), propOr("^[A-Za-z0-9- ]*$", "pattern"))(scheme);
	return ifElse(test(regex), always(null), always("Data does not match the regex pattern"));
};
const checkNumericRange = scheme => {
	const [min = -Infinity, max = Infinity, exMin = false, exMax = false] = props(
		["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum"],
		scheme
	);
	const gteMin = exMin ? flip(gt)(min) : flip(gte)(min);
	const lteMax = exMax ? flip(lt)(max) : flip(lte)(max);
	return ifElse(
		both(gteMin, lteMax),
		always(null),
		always(`Value must be within ${min}${exMin ? "(exclusive)" : ""} and ${max}${exMax ? "(exclusive)" : ""} range`)
	);
};
const checkDate = () => {
	return ifElse(
		d => moment(d, moment.ISO_8601, true).isValid(),
		always(null),
		always("Date doesn't match the pattern specified")
	);
};
const checkUniqueItems = () => {
	return ifElse(
		arr => {
			const uArrLen = compose(length, uniq)(arr);
			const arrLen = length(arr);
			return arrLen === uArrLen;
		},
		always(null),
		always("Array items need to be unique")
	);
};

const validators = {
	double: [checkNumericRange],
	string: [checkPattern, checkStringLength],
	object: [],
	array: [checkUniqueItems],
	objectId: [],
	bool: [],
	date: [checkDate],
	int: [checkNumericRange],
	timestamp: [],
	long: [checkNumericRange],
	decimal: [checkNumericRange],
};
const isArray = is(Array);
const isObject = is(Object);
const getBsonType = prop("bsonType");
const getValidatorFns = compose(converge(prop, [getBsonType, always(validators)]));

function validate(scheme) {
	const validatorFns = getValidatorFns(scheme);
	const callValidatorWithScheme = flip(call)(scheme);
	const validator = map(callValidatorWithScheme, validatorFns);
	return assoc("validator", validator, scheme);
}

function exportError(scheme) {
	const type = getBsonType(scheme);
	let schemeWithValidation = validate(scheme);

	if (type === "array") {
		const itemScheme = prop("items", scheme);
		if (isObject(itemScheme)) {
			const newItemScheme = validate(itemScheme);
			return assoc("items", newItemScheme, schemeWithValidation);
		} else if (isArray(itemScheme)) {
			const cb = scheme => validate(scheme);
			const newItemScheme = map(cb, itemScheme);
			return assoc("items", newItemScheme, schemeWithValidation);
		}
	}

	return schemeWithValidation;
}

export default exportError;
