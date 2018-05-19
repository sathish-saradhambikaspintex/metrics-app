/* eslint-disable quotes, no-console */
import StyledTd from "./StyledTd";
import StyledTable from "./StyledTable";
import React, { PureComponent } from "react";
import defaultHeaderRenderer from "./defaultHeaderRenderer";
import {
	is,
	map,
	addIndex,
	range,
	either,
	isNil,
	path,
	pathOr,
	isEmpty,
	filter,
	pathSatisfies,
	length,
	compose,
	head,
} from "ramda";
const mapIndexed = addIndex(map);
const isNumberInvalid = either(isNil, isNaN);

class HTMLTable extends PureComponent {
	static displayName = "HO.HTMLTable.Container";
	static defaultProps = { rowHeight: 30, layoutStyle: "auto" };

	constructor(props) {
		super(props);
		if (props.layoutStyle === "fixed") {
			console.info('Table style is set to "fixed" with "width : 100%". All column widths will be taken in "%"');
		} else {
			console.info('Table layout style is set to "auto". All column widths would be in "px"');
		}

		this.handleTRClick = this.handleTRClick.bind(this);
		this.renderTR = this.renderTR.bind(this);
		this.renderTH = this.renderTH.bind(this);
		this.renderTD = this.renderTD.bind(this);
	}
	render() {
		const { border, width, height, rowCount, layoutStyle, children } = this.props;
		if (isNumberInvalid(rowCount)) {
			throw new Error(`Invalid rowCount prop with value ${rowCount}`);
		}
		const tableStyle = { tableLayout: layoutStyle, width: layoutStyle === "fixed" ? "100%" : width, height };
		const childrenArray = React.Children.toArray(children);
		const childrenWithNullLabels = filter(pathSatisfies(v => v != null, ["props", "label"]), childrenArray);
		const shouldRenderHeader = length(childrenWithNullLabels) > 0;

		return (
			<StyledTable border={border} style={tableStyle}>
				{shouldRenderHeader && this.renderHeaderRow()}
				{this.renderRows(!shouldRenderHeader)}
			</StyledTable>
		);
	}

	renderHeaderRow() {
		const { rowHeight, children } = this.props;
		const childrenArray = React.Children.toArray(children);
		return (
			<thead>
				<tr style={{ height: rowHeight }}>{mapIndexed(this.renderTH, childrenArray)}</tr>
			</thead>
		);
	}
	renderTH(child, idx) {
		const { layoutStyle } = this.props;
		const label = pathOr("", ["props", "label"], child);
		const key = `col-header-${idx}`;
		const width = path(["props", "width"], child) + (layoutStyle === "fixed" ? "%" : "px");
		const thStyle = { padding: "3px 6px", textTransform: "uppercase", width };
		return (
			<th style={thStyle} key={key}>
				{defaultHeaderRenderer({ key, label })}
			</th>
		);
	}
	renderRows(shouldCalcTdWidth) {
		let { rowCount, children, layoutStyle, rowHeight, onRowClick } = this.props;
		const rowRange = range(0, rowCount);

		if (isEmpty(rowRange)) {
			const style = {
				padding: "30px 10px",
				fontSize: 18,
			};
			const childrenCount = React.Children.count(children);
			return (
				<tbody>
					<tr>
						<td style={style} colSpan={childrenCount}>
							No items to display
						</td>
					</tr>
				</tbody>
			);
		}

		const trs = map(this.renderTR, rowRange);
		if (shouldCalcTdWidth) {
			const getWidth = idx => path([idx, "props", "width"], children) + (layoutStyle === "fixed" ? "%" : "px");
			const calcWidth = (td, idx) => React.cloneElement(td, { style: { width: getWidth(idx) } });
			const firstRow = compose(path(["props", "children"]), head)(trs);
			const firstRowTds = mapIndexed(calcWidth, firstRow);
			trs[0] = (
				<tr
					id="0"
					key="row-0"
					data-key="row-0"
					onClick={onRowClick ? this.handleTRClick : undefined}
					style={onRowClick ? { cursor: "pointer", height: rowHeight } : { height: rowHeight }}
				>
					{firstRowTds}
				</tr>
			);
		}

		return <tbody>{trs}</tbody>;
	}
	renderTR(rowIndex) {
		let { rowHeight, onRowClick, children } = this.props;
		const childrenArray = React.Children.toArray(children);
		return (
			<tr
				id={rowIndex}
				key={`row-${rowIndex}`}
				data-key={`row-${rowIndex}`}
				onClick={onRowClick ? this.handleTRClick : undefined}
				style={onRowClick ? { cursor: "pointer", height: rowHeight } : { height: rowHeight }}
			>
				{mapIndexed(this.renderTD(rowIndex), childrenArray)}
			</tr>
		);
	}
	renderTD(rowIndex) {
		const { layoutStyle } = this.props;
		const truncateStringStyle = {
			width: "inherit",
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		};
		return (child, colIndex) => {
			const key = `cell-${rowIndex}-${colIndex}`;
			const renderCell = path(["props", "render"], child);
			const tdProps = { key, "data-key": key };
			let renderedNode = renderCell(rowIndex);
			if (is(String, renderedNode)) renderedNode = <div style={truncateStringStyle}>{renderedNode}</div>;

			return <StyledTd {...tdProps}>{renderedNode}</StyledTd>;
		};
	}

	handleTRClick(e) {
		const { id } = e.currentTarget;
		const { onRowClick } = this.props;
		if (onRowClick) return onRowClick(id);
		return;
	}
}

export default HTMLTable;
