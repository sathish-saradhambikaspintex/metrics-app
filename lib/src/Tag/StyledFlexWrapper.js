/* eslint-disable react/display-name */
import React from "react";
import { compose, map, head, tail } from "ramda";

const makeFlexItem = child =>
	React.cloneElement(child, { style: { ...child.props.style, flex: "1 0 auto", marginBottom: 4, marginRight: 4 } });
export default function({ children }) {
	const newChildren = compose(map(makeFlexItem), React.Children.toArray)(children);
	return <div style={{ display: "flex", flexWrap: "wrap" }}>{newChildren}</div>;
}
