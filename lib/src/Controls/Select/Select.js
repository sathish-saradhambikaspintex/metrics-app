import React, { Component } from "react";
import shortId from "shortid";
import { compose, length, find, propEq, isNil, either, assoc, isEmpty, filter, map, addIndex, prop, is } from "ramda";
import Input from "../Input/Input";
import Button from "../../Button";
import Menu from "../../Menu";
import Icon from "../../Icon";
import Popover from "../../Popover";

const mapIndexed = addIndex(map);
const isEmptyOrNil = either(isEmpty, isNil);

class Select extends Component {
	static displayName = "HO.Controls.Select";
	static defaultProps = {
		labelKey: "label",
		valueKey: "value",
	};
	state = { query: "" };
	getLabelOfItemWithValue = value => {
		if (!value) return;
		const { labelKey, valueKey, items } = this.props;
		return compose(prop(labelKey), find(propEq(valueKey, value)))(items);
	};
	getItems = query => {
		const { items, itemPredicate } = this.props;
		let filtererdItems = items;
		if (query && itemPredicate) {
			const filterPredicate = item => itemPredicate(item, query);
			filtererdItems = filter(filterPredicate, items);
		}
		if (length(filtererdItems) < 1 && !isEmpty(query)) return "No results for query...";
		return filtererdItems;
	};
	renderItems = items => {
		const { labelKey, valueKey } = this.props;
		const renderItem = item => {
			const key = shortId.generate();
			const label = prop(labelKey, item);
			const value = prop(valueKey, item);
			return <Menu.Item text={label} key={key} data-value={value} />;
		};
		return mapIndexed(renderItem, items);
	};

	constructor() {
		super();
		this.handleQueryChange = this.handleQueryChange.bind(this);
		this.handleItemClick = this.handleItemClick.bind(this);
	}
	render() {
		return (
			<Popover placement="bottom-start" onClick={this.handleItemClick}>
				{this.renderTarget()}
				{this.renderMenu()}
			</Popover>
		);
	}
	renderTarget() {
		const { value, placeholder } = this.props;

		const items = this.getItems();
		const displayText = isEmptyOrNil(value) ? placeholder || "Select..." : this.getLabelOfItemWithValue(value);
		return (
			<Button
				fill
				text={displayText}
				rightIcon="caret-down"
				style={{ textAlign: "left", background: "white", color: "black" }}
			/>
		);
	}
	renderMenu() {
		const { itemPredicate } = this.props;
		const { query } = this.state;
		const items = compose(this.renderItems, this.getItems)(query);
		if (!items) return null;

		const input = itemPredicate ? (
			<Controls.Input
				leftIcon={<Icon icon="search" />}
				placeholder="Filter"
				value={query}
				onChange={this.handleQueryChange}
			/>
		) : null;

		return (
			<Menu>
				{input}
				{items}
			</Menu>
		);
	}

	// EVENTS
	handleQueryChange({ value }) {
		this.setState(assoc("query", value));
	}
	handleItemClick(event) {
		const { value } = event.target.dataset;
		const { onChange, name } = this.props;
		if (is(Function, onChange)) {
			return onChange({ name, value });
		}
		throw new Error("Is this supposed to happen");
	}
}

export default Select;
