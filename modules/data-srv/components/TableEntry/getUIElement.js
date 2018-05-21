import uIElements from "./uIElements";
import { prop } from "ramda";

export default function getUIElement(props) {
	const { displayType, ...otherProps } = props;
	const cb = prop(displayType, uIElements);
	if (!cb) return null;
	return cb(otherProps);
}
