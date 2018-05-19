import React from "react";
import { repeat, map, flatten } from "ramda";

export default function renderTR([items, span, count]) {
	const getTHs = item => <th colSpan={span}>{item}</th>;
	const thsSet = repeat(map(getTHs, items), count);
	return <tr>{flatten(thsSet)}</tr>;
}
