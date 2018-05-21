import React from "react";
import { prop, ifElse, compose } from "ramda";

const setStyles = event => {
	event.target.style.background = "rgba(0,0,0,0.04)";
	event.target.style.border = "1px dashed rgba(0,0,0,0.9)";
	return event;
};
const resetStyles = event => {
	event.target.style.background = "";
	event.target.style.border = "";
	return event;
};
const stopEvent = event => {
	event.preventDefault();
	event.stopPropagation();
	return event;
};
const handleDragEnter = ifElse(
	e => e.target.getAttribute("data-drop-target-name") === "ho-drop-target",
	compose(setStyles, stopEvent),
	() => {}
);
const handleDragOver = stopEvent;
const handleDragLeave = resetStyles;

function makeDropTarget(WrappedComponent) {
	const { onDrop } = prop("props", WrappedComponent);
	const handleDrop = event => {
		resetStyles(event);
		const dragTargetId = event.dataTransfer.getData("text/plain");
		const dropTargetId = event.target.id;
		return onDrop(dragTargetId, dropTargetId);
	};
	return React.cloneElement(WrappedComponent, {
		"data-drop-target-name": "ho-drop-target",
		onDrop: handleDrop,
		onDragEnter: handleDragEnter,
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
	});
}

export default makeDropTarget;
