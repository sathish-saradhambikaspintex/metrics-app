import moment from "moment";

const HTML5_DATE = moment.HTML5_FMT.DATE;
const HTML5_DATETIME = moment.HTML5_FMT.DATETIME_LOCAL;
const HTML5_TIME = moment.HTML5_FMT.TIME;
const HTML5_WEEK = moment.HTML5_FMT.WEEK;
const HTML5_MONTH = moment.HTML5_FMT.MONTH;

export default {
	date: val => val && moment(val, HTML5_DATE).toISOString(),
	"datetime-local": val => val && moment(val, HTML5_DATETIME).toISOString(),
	time: val => val && moment(val, HTML5_TIME).toISOString(),
	week: val => val && moment(val, HTML5_WEEK).toISOString(),
	month: val => val && moment(val, HTML5_MONTH).toISOString(),
	number: val => val && Number(val),
	text: val => val && val.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, ""),
};
