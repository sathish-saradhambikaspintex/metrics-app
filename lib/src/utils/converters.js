import { curry } from "ramda";
import moment from "moment";

const toDate = curry((format, date) => {
	const formatString = format || "D MMM YYYY, HH:mm A";
	if (date) {
		return moment(date)
			.utc()
			.local()
			.format(formatString);
	}
	return "";
});

export default { toDate };
