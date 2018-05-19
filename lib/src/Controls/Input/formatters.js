import moment from "moment";

const HTML5_DATE = moment.HTML5_FMT.DATE;
const HTML5_DATETIME = moment.HTML5_FMT.DATETIME_LOCAL;
const HTML5_TIME = moment.HTML5_FMT.TIME;
const HTML5_WEEK = moment.HTML5_FMT.WEEK;
const HTML5_MONTH = moment.HTML5_FMT.MONTH;

export default {
	date: val => val && moment(val).format(HTML5_DATE),
	"datetime-local": val => val && moment(val).format(HTML5_DATETIME),
	time: val => val && moment(val).format(HTML5_TIME),
	week: val => val && moment(val).format(HTML5_WEEK),
	month: val => val && moment(val).format(HTML5_MONTH),
};
