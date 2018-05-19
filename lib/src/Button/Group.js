import React from "react";
import { forEach, compose, head, slice, map, last, curry, merge, equals, prop, split, path } from "ramda";

const isOfButtonType = compose(equals("Button"), prop(1), split("."), path(["type", "displayName"]));
const isOfMinimalButtonType = compose(equals("Minimal"), prop(2), split("."), path(["type", "displayName"]));
const toArray = React.Children.toArray;
const cloneElement = curry((props, elem) => React.cloneElement(elem, props));
const firstElemStyle = (vertical, minimal) => ({
	marginTop: vertical ? -1 : 0,
	marginLeft: vertical ? 0 : -1,
	borderRadius: minimal ? "3px" : vertical ? "3px 3px 0px 0px" : "3px 0px 0px 3px",
});
const lastElemStyle = (vertical, minimal) => ({
	marginTop: vertical ? -1 : 0,
	marginLeft: vertical ? 0 : -1,
	borderRadius: minimal ? "3px" : vertical ? "0px 0px 3px 3px" : "0px 3px 3px 0px",
});
const middleElemStyle = (vertical, minimal) => ({
	marginTop: vertical ? -1 : 0,
	marginLeft: vertical ? 0 : -1,
	borderRadius: minimal ? "3px" : 0,
});

function Group(props) {
	const { vertical, style } = props;
	let areMinimalButtonsFlag = false;
	const children = toArray(props.children);
	for (let index = 0; index < children.length; index++) {
		const child = children[index];
		if (!isOfButtonType(child)) {
			throw new Error("All children must be of Button type");
		} else if (!isOfMinimalButtonType(child)) {
			areMinimalButtonsFlag = false;
			break;
		} else {
			areMinimalButtonsFlag = true;
			break;
		}
	}

	const defaultStyle = merge(style, { display: "flex", justifyContent: "space-between" });
	const verticalStyle = vertical ? { flexFlow: "column" } : {};
	const firstElem = compose(cloneElement({ style: firstElemStyle(vertical, areMinimalButtonsFlag) }), head, toArray)(
		children
	);
	const lastElem = compose(cloneElement({ style: lastElemStyle(vertical, areMinimalButtonsFlag) }), last, toArray)(
		children
	);
	const middleElem = compose(
		map(cloneElement({ style: middleElemStyle(vertical, areMinimalButtonsFlag) })),
		slice(1, -1),
		toArray
	)(children);

	return (
		<div style={merge(verticalStyle, defaultStyle)}>
			{firstElem}
			{middleElem}
			{lastElem}
		</div>
	);
}

Group.displayName = "HO.Button.Group";
export default Group;
