import camelcase from "camelcase";

export default function convertScheme(scheme) {
	const {
		isArrayType,
		altType,
		title,
		description,
		placeholder,
		id,
		required,
		displayType,
		maxItems,
		minItems,
		uniqueItems,
		labelPosition,
		...others
	} = scheme;
	let bsonType = displayType;

	if (displayType === "text") bsonType = "string";
	if (displayType === "long-text") bsonType = "string";
	if (displayType === "object") bsonType = "array";

	if (isArrayType) {
		return {
			displayType,
			bsonType: "array",
			items: { ...others, displayType },
			title,
			name: camelcase(title),
			description,
			placeholder,
			maxItems,
			minItems,
			labelPosition,
			uniqueItems,
		};
	} else {
		return {
			...others,
			displayType,
			bsonType,
			title,
			description,
			placeholder,
			name: camelcase(title),
			labelPosition,
		};
	}
}
