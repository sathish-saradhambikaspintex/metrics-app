import React from "react";
import { filter, compose, not, isNil, pathOr, is } from "ramda";
import Icon from "../../Icon";

const getStyleProp = pathOr({}, ["props", "style"]);
export default (element, style = {}) => {
	if (!element) return { element: null, count: 0 };
	if (is(String, element)) {
		return {
			element: <Icon style={{ ...style, ...getStyleProp(element) }} text={element} />,
			count: 1,
		};
	}

	const children = filter(compose(not, isNil), React.Children.toArray(element.props.children));
	const newElement = React.cloneElement(element, { style: { ...style, ...getStyleProp(element) } });
	const count = React.Children.count(children) || 1;
	return { element: newElement, count };
};
