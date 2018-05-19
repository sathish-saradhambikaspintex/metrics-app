import { compose, prop, propEq, not, isNil, find, merge, map, filter } from "ramda";
const checkNull = compose(not, isNil);

export default function joinInner(key, a, b) {
	const f = aItem => {
		const id = prop(key, aItem);
		const bItem = find(propEq(key, id), b);
		if (isNil(bItem)) return null;
		return merge(aItem, bItem);
	};
	return compose(filter(checkNull), map(f))(a);
}
