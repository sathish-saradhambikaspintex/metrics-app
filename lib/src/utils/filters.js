import moment from "moment";
import { propSatisfies, test, equals, curry, pathSatisfies, prop, T } from "ramda";

const checkVal = value => value == null || value === "" || value == false;
const isSameOrAfter = curry((query, datum) => moment(datum).isSameOrAfter(query));
const isSameOrBefore = curry((query, datum) => moment(datum).isSameOrBefore(query));

function name(value) {
	if (checkVal(value)) return T;
	const pattern = new RegExp(value, "i");
	return propSatisfies(test(pattern), "displayName");
}
function userName(value) {
	if (checkVal(value)) return T;
	const pattern = new RegExp(value, "i");
	return propSatisfies(test(pattern), "username");
}
function workbook(value) {
	if (checkVal(value)) return T;
	const pattern = new RegExp(value, "i");
	return pathSatisfies(test(pattern), ["workbook", "label"]);
}
function createdAfter(value) {
	if (checkVal(value)) return T;
	const queryMoment = moment(value);
	return propSatisfies(isSameOrAfter(queryMoment), "createdAt");
}
function createdBefore(value) {
	if (checkVal(value)) return T;
	const queryMoment = moment(value);
	return propSatisfies(isSameOrBefore(queryMoment), "createdAt");
}
function favorite(value) {
	if (checkVal(value)) return T;
	return propSatisfies(equals(true), "isFavorite");
}
function recent(value) {
	if (checkVal(value)) return T;
	const dateBefore = moment().subtract(10, "days");
	return propSatisfies(isSameOrAfter(dateBefore), "createdAt");
}

const predicates = {
	name,
	userName,
	workbook,
	createdAfter,
	createdBefore,
	favorite,
	recent,
};

export default type => {
	return prop(type, predicates);
};
