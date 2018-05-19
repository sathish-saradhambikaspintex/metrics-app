import React from "react";
import { is, merge } from "ramda";
const isFn = is(Function);

const getTarget = (component, props) => {
	const { innerRef, children, ...restProps } = merge(props, component.props);
	const setTargetRef = node => isFn(innerRef) && innerRef(node);

	const componentProps = {
		innerRef: setTargetRef,
		...restProps,
	};

	return React.cloneElement(component, componentProps, children);
};

export default getTarget;
