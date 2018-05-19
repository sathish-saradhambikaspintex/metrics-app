import React from "react";
import { is, isEmpty, map, addIndex } from "ramda";

import Select from "./Select";
import Tag from "../../Tag";

const mapIndexed = addIndex(map);
const isArray = is(Array);

class List extends Select {
	static displayName = "HO.Select.List";
	constructor() {
		super();
	}
	renderLabel() {
		const { value, multi } = this.props;
		const { inputValue } = this.state;

		const renderLabel = (value, index) => (
			<Tag key={value} intent="primary" text={value} onClose={event => this.removeValue(index, event)} />
		);

		if (isEmpty(value)) return null;
		if (inputValue) return null;
		if (multi && isArray(value)) return <div>{mapIndexed(renderLabel, value)}</div>;
		return <div>{value}</div>;
	}
	getOptionLabel(option) {
		return option;
	}
}

export default List;
