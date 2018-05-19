import { tail, length, compose, product, map, of, concat } from "ramda";

export default function getSpan(data) {
	const tailData = tail(data);
	if (length(tailData) < 1) return [1];
	const span = compose(of, product, map(length))(tailData);
	return concat(span, getSpan(tailData));
}
