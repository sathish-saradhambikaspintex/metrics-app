import { insertAll, flip, prop, compose, pick, juxt, map, is, unnest, assoc, identity, converge } from "ramda";

// https://docs.mongodb.com/manual/reference/operator/query/type/#document-type-available-types

const supportedProps = ["title", "description", "bsonType", "enum"];
const unsupportedProps = ["name", "displayType", "default","labelPosition"];
const supportedBsonTypes = {
	double: ["minimum", "exclusiveMinimum", "maximum", "exclusiveMaximum"],
	string: ["minLength", "maxLength", "pattern"],
	object: ["properties", "required"],
	array: ["items", "uniqueItems", "maxItems", "minItems"],
	objectId: [],
	bool: [],
	date: [],
	int: ["minimum", "exclusiveMinimum", "maximum", "exclusiveMaximum"],
	timestamp: [],
	long: ["minimum", "exclusiveMinimum", "maximum", "exclusiveMaximum"],
	decimal: ["minimum", "exclusiveMinimum", "maximum", "exclusiveMaximum"],
};
const unsupportedBsonTypes = {
	string: ["api"],
};

const isArray = is(Array);
const isObject = is(Object);
const getBsonType = prop("bsonType");
const getUnsupportedBsonTypeProps = flip(prop)(unsupportedBsonTypes);
const getSupportedBsonTypeProps = flip(prop)(supportedBsonTypes);
const getBsonTypeProps = compose(unnest, juxt([getSupportedBsonTypeProps, getUnsupportedBsonTypeProps]));
const insertSupportedProps = insertAll(0, supportedProps);
const insertUnsupportedProps = insertAll(0, unsupportedProps);
const getProps = compose(insertUnsupportedProps, insertSupportedProps, getBsonTypeProps, getBsonType);
const pickValidProps = converge(pick, [getProps, identity]);

function whiteList(scheme) {
	const type = getBsonType(scheme);
	const mainList = pickValidProps(scheme);

	if (type === "array") {
		const itemsScheme = prop("items", scheme);
		if (isObject(itemsScheme)) {
			return assoc("items", pickValidProps(itemsScheme), mainList);
		} else if (isArray(itemsScheme)) {
			return assoc("items", map(pickValidProps, itemsScheme), mainList);
		}
	}

	return mainList;
}

export default whiteList;
