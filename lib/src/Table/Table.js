import styled from "styled-components";
import React, { Component } from "react";
import { map, addIndex, reduce, compose, pathOr, add } from "ramda";

import Grid from "../Grid";
import defaultRowRenderer from "./defaultRowRenderer";
import defaultCellRenderer from "./defaultCellRenderer";
import defaultHeaderRenderer from "./defaultHeaderRenderer";

const getChildrenArray = React.Children.toArray;
const mapIndexed = addIndex(map);
const getFlexStyleForColumn = (column, customStyle = {}) => {
	const { flexGrow = 0, flexShrink = 1, width = 32, maxWidth, minWidth } = column.props;
	const flexValue = `${flexGrow} ${flexShrink} ${width}px`;
	return {
		...customStyle,
		flex: flexValue,
		msFlex: flexValue,
		WebkitFlex: flexValue,
		maxWidth,
		minWidth,
	};
};
const HeaderRow = styled.div.attrs({
	role: "row",
})`
	font-weight: 700;
	text-transform: uppercase;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid #e0e0e0;
	overflow: hidden;
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	padding-right: ${props => props.scrollbarWidth}px;
`;
const Container = styled.div`
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	overflow: hidden;
	border: ${props => (props.noBorder ? 0 : "1px solid #e0e0e0")};
`;

export default class Table extends Component {
	static displayName = "HO.Table";
	state = { scrollbarWidth: 0 };

	constructor(props) {
		super(props);

		const columnsWidths = compose(map(pathOr(100, ["props", "width"])), getChildrenArray)(props.children);
		this._totalColumnWidth = reduce(add, 0, columnsWidths);
		this._renderHeaderRow = this._renderHeaderRow.bind(this);
		this._createRow = this._createRow.bind(this);
		this._transformHeaderRow = this._transformHeaderRow.bind(this);
	}
	_setHeaderRowRef = ref => (this._HeaderRow = ref);
	_setGridRef = ref => (this._Grid = ref);

	render() {
		const { children } = this.props;

		this._cachedColumnStyles = [];
		const columns = getChildrenArray(children);
		columns.forEach((column, index) => {
			const flexStyles = getFlexStyleForColumn(column, column.props.style);
			this._cachedColumnStyles[index] = {
				...flexStyles,
				overflow: "hidden",
			};
		});

		return (
			<Container {...this._getProps().container}>
				{this._renderHeaderRow()}
				<Grid {...this._getProps().grid} />
			</Container>
		);
	}

	forceUpdateGrid() {
		if (this._Grid) {
			this._Grid.forceUpdate();
		}
	}

	_getProps() {
		const { height, width, rowCount, rowHeight, noBorder } = this.props;
		return {
			container: {
				noBorder,
				height,
				width: Math.min(width, this._totalColumnWidth),
			},
			grid: {
				height,
				ref: this._setGridRef,
				width: Math.min(width, this._totalColumnWidth),
				rowCount,
				rowHeight,
				onScrollCb: this._transformHeaderRow,
				columnWidth: this._totalColumnWidth,
				columnCount: 1,
				cellRenderer: this._createRow,
			},
		};
	}

	_transformHeaderRow(target) {
		const { scrollLeft } = target;
		this._HeaderRow.style.transform = `translate(-${scrollLeft}px)`;
	}

	_renderHeaderRow() {
		const { children } = this.props;
		const { scrollbarWidth } = this.state;

		const createHeader = (column, index) => {
			const key = `header-${index}`;
			const { label } = column.props;
			const style = getFlexStyleForColumn(column);
			return defaultHeaderRenderer({ key, label, style });
		};

		return (
			<HeaderRow
				innerRef={this._setHeaderRowRef}
				height={45}
				width={this._totalColumnWidth}
				scrollbarWidth={scrollbarWidth}
			>
				{mapIndexed(createHeader, getChildrenArray(children))}
			</HeaderRow>
		);
	}

	_createRow(params) {
		const { children, rowHeight = 35 } = this.props;
		const { scrollbarWidth } = this.state;
		const { key, rowIndex, style } = params;

		const renderColumn = (column, columnIndex) => {
			const colKey = `${key}-col-${columnIndex}`;
			const { render } = column.props;
			const style = this._cachedColumnStyles[columnIndex];
			return defaultCellRenderer({ rowIndex, key: colKey, render, columnIndex, style });
		};

		const columns = mapIndexed(renderColumn, getChildrenArray(children));

		const flattenedStyle = {
			...style,
			height: rowHeight,
			width: this._totalColumnWidth,
			overflow: "hidden",
			paddingRight: scrollbarWidth,
		};
		return defaultRowRenderer({
			columns,
			index: rowIndex,
			key,
			// to be fixed
			rowData: {},
			style: flattenedStyle,
		});
	}
}
