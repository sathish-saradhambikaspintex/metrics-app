import getSpan from "./getSpan";
import React, { Component } from "react";
import getTR from "./renderXHeaderTRs";
import { head, tail, reverse, compose, map, any, equals, isEmpty, concat, of } from "ramda";

const renderTR = compose(of, getTR);
const checkEmptyInArray = compose(any(equals(true)), map(isEmpty));
class PivotTable extends Component {
	valueKeys = this.props.valueKeys;
	xHeaderData = this.props.headerKeys;
	xHeaderSpan = getSpan(this.xHeaderData);
	xHeaderCount = reverse(this.xHeaderSpan);

	render() {
		const xHeaderDefinition = [this.xHeaderData, this.xHeaderSpan, this.xHeaderCount];
		return <table>{this.renderXHeaders(xHeaderDefinition)}</table>;
	}
	renderXHeaders(data) {
		const f = map(head)(data);
		const t = map(tail)(data);
		if (checkEmptyInArray(t)) return renderTR(f);
		return concat(renderTR(f), this.renderXHeaders(t));
	}
}

export default PivotTable;

// RAMDA EDITOR CODE

// const getData = map(omit(["_id"]));
// const headerKeys = ["segment", "category", "orderDate"];
// const getGroups = map(prop("_id"));
// const getHeaders = compose(uniq, map(prop("segment")));
// headers;
