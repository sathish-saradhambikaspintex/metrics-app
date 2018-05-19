import styled from "styled-components";
import NonIdealState from "../NonIdealState";
import React, { PureComponent } from "react";
import defaultCellRenderer from "./defaultCellRenderer";
import getCellRendererParams from "./getCellRendererParams";
import SizeAndPositionManager from "./SizeAndPositionManager";
import {
	either,
	allPass,
	curry,
	isNil,
	isEmpty,
	gt,
	length,
	complement,
	is,
	map,
	compose,
	xprod,
	forEach,
	prop,
	join,
} from "ramda";

const DEFAULT_COLUMN_WIDTH = 100;
const DEFAULT_ROW_HEIGHT = 40;
const SCROLLING_RESET_TIME_INTERVAL = 4000;
const isEmptyOrNil = either(isNil, isEmpty);
const isNonZeroArray = allPass([complement(isEmptyOrNil), compose(gt(0), length)]);
const isFunction = is(Function);
const getKeys = compose(map(join("-")), xprod);
const columnWidthGetter = curry((columnWidth, idx) => {
	if (isEmptyOrNil(columnWidth)) return 100;
	if (isFunction(columnWidth)) return columnWidth(idx);
	if (isNonZeroArray(columnWidth)) return columnWidth[idx];
	return columnWidth;
});
const rowHeightGetter = curry((rowHeight, idx) => {
	if (isEmptyOrNil(rowHeight)) return 35;
	if (isFunction(rowHeight)) return rowHeight(idx);
	return rowHeight;
});

const ScrollingContainer = styled.div`
	position: relative;
	overflow: hidden;
`;
const GridContainer = styled.div`
	box-sizing: border-box;
	overflow: auto;
	will-change: transform;
	direction: ltr;
`;

export default class Grid extends PureComponent {
	static displayName = "HO.Grid";

	static defaultProps = {
		cellRenderer: defaultCellRenderer,
	};

	state = {
		isScrolling: false,
		scrollLeft: 0,
		scrollTop: 0,
	};

	_cellCache = {};
	_childrenToDisplay;
	_rowSizeAndPositionManager;
	_columnSizeAndPositionManager;
	_grid;
	_debounceScrollFlag = null;
	_setGridRef = ref => (this._grid = ref);

	constructor(props) {
		super(props);
		const { rowCount, columnCount, rowHeight, columnWidth, onScrollCb } = props;

		this._onScroll = this._onScroll.bind(this, onScrollCb);
		this._debounceScroll = this._debounceScroll.bind(this);
		this._resetCache = this._resetCache.bind(this);
		this._renderCell = this._renderCell.bind(this);

		this._rowSizeAndPositionManager = new SizeAndPositionManager({
			cellCount: rowCount,
			cellSizeGetter: rowHeightGetter(rowHeight),
			estimatedCellSize: rowHeight || DEFAULT_ROW_HEIGHT,
		});
		this._columnSizeAndPositionManager = new SizeAndPositionManager({
			cellCount: columnCount,
			cellSizeGetter: columnWidthGetter(columnWidth),
			estimatedCellSize: columnWidth || DEFAULT_COLUMN_WIDTH,
		});
	}

	componentWillReceiveProps(nextProps) {
		const { columnCount, rowCount, rowHeight, columnWidth } = nextProps;
		this._columnSizeAndPositionManager.configure({
			cellCount: columnCount,
			estimatedCellSize: columnWidth || DEFAULT_COLUMN_WIDTH,
		});
		this._rowSizeAndPositionManager.configure({
			cellCount: rowCount,
			estimatedCellSize: rowHeight || DEFAULT_ROW_HEIGHT,
		});
	}

	render() {
		const { height, width } = this.props;
		const { isScrolling } = this.state;
		const totalRowsHeight = this._rowSizeAndPositionManager.getTotalSize();
		const totalColumnWidth = this._columnSizeAndPositionManager.getTotalSize();
		const childernToDisplay = this._calculateChildrenToRender();
		const gridStyle = {
			height,
			width,
			overflowX: totalColumnWidth <= width ? "hidden" : "auto",
			overflowY: totalRowsHeight <= height ? "hidden" : "auto",
		};
		const scrollingContainerStyle = {
			width: totalColumnWidth,
			height: totalRowsHeight,
			maxWidth: totalColumnWidth,
			maxHeight: totalRowsHeight,
			pointerEvents: isScrolling ? "none" : "",
		};

		return (
			<GridContainer style={gridStyle} innerRef={this._setGridRef} onScroll={this._onScroll}>
				{childernToDisplay.length > 0 ? (
					<ScrollingContainer style={scrollingContainerStyle}>{childernToDisplay}</ScrollingContainer>
				) : (
					this._renderNoContent()
				)}
			</GridContainer>
		);
	}

	_calculateChildrenToRender(props = this.props, state = this.state) {
		const { width, height } = props;
		const { scrollLeft, scrollTop } = state;

		if (height > 0 && width > 0) {
			this._visibleRowRange = this._rowSizeAndPositionManager.getVisibleRange({
				containerSize: height,
				offset: scrollTop,
			});
			this._visibleColumnRange = this._columnSizeAndPositionManager.getVisibleRange({
				containerSize: width,
				offset: scrollLeft,
			});

			const cellRangeParams = getCellRendererParams({
				visibleRowRange: this._visibleRowRange,
				visibleColumnRange: this._visibleColumnRange,
				columnSizeAndPositionManager: this._columnSizeAndPositionManager,
				rowSizeAndPositionManager: this._rowSizeAndPositionManager,
			});

			return map(this._renderCell, cellRangeParams);
		}
	}

	_renderCell(params) {
		const { key } = params;
		const { cellRenderer } = this.props;
		const { isScrolling } = this.state;
		let renderedCell = null;

		if (isScrolling) {
			if (!this._cellCache[key]) {
				this._cellCache[key] = cellRenderer(params);
			}
			renderedCell = this._cellCache[key];
		} else {
			renderedCell = cellRenderer(params);
			this._cellCache[key] = renderedCell;
		}

		return renderedCell;
	}

	_onScroll(cb, event) {
		const target = prop("target", event);
		if (target === this._grid) {
			if (cb) cb(target);
			if (target.scrollTop < 0) return;

			this._debounceScroll();

			const { width, height } = this.props;
			const totalRowHeight = this._rowSizeAndPositionManager.getTotalSize();
			const totalColumnsWidth = this._columnSizeAndPositionManager.getTotalSize();
			const scrollTop = Math.min(Math.max(0, totalRowHeight - height), target.scrollTop);
			const scrollLeft = Math.min(Math.max(0, totalColumnsWidth - width), target.scrollLeft);
			this.setState({
				scrollLeft,
				scrollTop,
				isScrolling: true,
			});
		}
	}

	_debounceScroll() {
		if (this._debounceScrollFlag) {
			clearTimeout(this._debounceScrollFlag);
		}

		this._debounceScrollFlag = setTimeout(() => {
			this._debounceScrollFlag = null;
			this._resetCache();
		}, SCROLLING_RESET_TIME_INTERVAL);
	}

	_resetCache() {
		const cellCache = this._cellCache;
		this._cellCache = {};

		// Copy over the visible cell styles so avoid unnecessary calculation
		const keys = getKeys(this._visibleRowRange, this._visibleColumnRange);

		forEach(key => {
			if (cellCache[key]) this._cellCache[key] = cellCache[key];
		}, keys);

		this.setState({ isScrolling: false });
	}

	_renderNoContent() {
		return <NonIdealState visual="exclamation" title="No data to display" />;
	}
}
