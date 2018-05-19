import React from "react";
import StyledRow from "./StyledRow";
import { length, filter, equals, map, path } from "ramda";

const getTypes = map(path(["type", "displayName"]));
const Row = props => {
	const childrenArray = React.Children.toArray(props.children);
	const columnTypeCount = length(filter(equals("HO.Column"), getTypes(childrenArray)));

	if (columnTypeCount === 0) return <StyledRow spaced {...props} />;
	return <StyledRow {...props} />;
};

Row.displayName = "HO.Row";
export default Row;
