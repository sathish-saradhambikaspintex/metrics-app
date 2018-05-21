import moment from "moment";
import { prop, identity, curry } from "ramda";
const getDatum = prop;
const getFieldName = prop("name");
const getBsonType = prop("displayType");

const hash = {
	boolean: identity,
	date: d => moment(d).format("DD-MM-YYYY"),
	month: d => moment(d).format(moment.HTML5_FMT.MONTH),
	time: d => moment(d).format(moment.HTML5_FMT.TIME),
	datetime: d => moment(d).format("DD-MM-YYYY hh:mm a"),
	decimal: d => Number(d).toFixed(2),
	integer: identity,
	longtext: identity,
	text: identity,
	//
	reference: () => null,
	list: () => null,
};

function getParsedData(data, scheme) {
	const bsonType = getBsonType(scheme);
	const fieldName = getFieldName(scheme);
	const datum = getDatum(fieldName, data);
	if (!datum) return;
	const parsedData = prop(bsonType, hash)(datum);

	return parsedData;
}

export default curry(getParsedData);
