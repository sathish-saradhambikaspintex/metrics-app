import React from "react";

const handleDragStart = event => event.dataTransfer.setData("text/plain", event.target.id);
function makeDraggable(WrappedComponent) {
	return React.cloneElement(WrappedComponent, { draggable: true, onDragStart: handleDragStart });
}

export default makeDraggable;
