import { forEachObjIndexed, assocPath, dissocPath, split, useWith, identity, path } from "ramda";

export const set = useWith(assocPath, [split("."), identity, identity]);
export const unset = useWith(dissocPath, [split("."), identity]);
export const param = obj => {
	if (!obj) return "";
	let str = "?";
	forEachObjIndexed((val, key) => {
		if (str !== "") str += "&";
		str += `${key}=${encodeURIComponent(val)}`;
	}, obj);
	return str;
};
export const getNextKey = path(["paging", "nextKey"]);
