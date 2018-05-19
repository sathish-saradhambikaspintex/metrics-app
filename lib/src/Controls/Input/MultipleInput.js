import React, { Component } from "react";
import { assoc, map, is, addIndex, append, remove, isEmpty, compose, uniq, trim, toUpper, identity } from "ramda";
import Input from "./Input";
import Button from "../../Button";
import Icon from "../../Icon";
import Tag from "../../Tag";
const mapIndexed = addIndex(map);
const strip = compose(toUpper, trim);

class MultipleInput extends Component {
	static displayName = "HO.Input.Multi";
	state = { inputValue: "" };
	setInputRef = ref => (this.input = ref);

	constructor() {
		super();
		this.renderClear = this.renderClear.bind(this);
		this.resetValue = this.resetValue.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	render() {
		const { inputValue } = this.state;
		return (
			<Input
				{...this.props}
				value={inputValue}
				ref={this.setInputRef}
				onKeyDown={this.handleKeyDown}
				onChange={this.handleInputChange}
				icon={this.renderIcon()}
				rightIcon={this.renderClear()}
			>
				{this.renderLabel()}
			</Input>
		);
	}
	renderLabel() {
		const { value } = this.props;
		if (!value) return null;
		const renderLabel = (option, index) => {
			return <Tag key={option} intent="primary" text={option} onClose={() => this.removeValue(index)} />;
		};
		return mapIndexed(renderLabel, value);
	}
	renderIcon() {
		const { leftElement } = this.props;
		if (is(String, leftElement)) {
			return <Icon text={`[${leftElement}]`} style={{ padding: "7px 7px" }} />;
		}
		return <Icon text="[ ]" style={{ padding: "7px 7px" }} />;
	}
	renderClear() {
		const { disabled } = this.props;
		if (disabled) return null;
		return (
			<Button.Minimal
				style={{ padding: "0 7px", margin: "-2px auto" }}
				tabIndex="-1"
				icon="times"
				intent="danger"
				onClick={this.resetValue}
			/>
		);
	}

	// EVENTS
	handleInputChange({ value }) {
		const { inputValue } = this.state;
		const { onInputChange } = this.props;

		if (value !== inputValue && onInputChange) {
			value = onInputChange(value);
		}

		this.setState(assoc("inputValue", value));
	}
	handleKeyDown(event) {
		if (event.preventDefaulted) return; // Do nothing if event already handled
		const { inputValue } = this.state;

		if (event && event.type === "keydown") {
			switch (event.keyCode) {
				case 13:
				case 188:
					if (this.input) {
						const value = strip(inputValue);
						this.addValue(value);
					}
					break;
				case 27:
					this.input.blur();
					break;
				default:
					return;
			}
			event.preventDefault();
		}
	}
	addValue(data) {
		if (isEmpty(data)) return;
		const { value, onChange, name, shouldBeUnique, valueType } = this.props;

		data = valueType === "number" ? Number(data) : data;
		const makeUniq = shouldBeUnique ? uniq : identity;
		const newValue = compose(makeUniq, append(data))(value);

		return onChange({ name, value: newValue });
	}
	removeValue(index) {
		const { value, onChange, name } = this.props;
		const newValue = remove(index, 1, value);
		return onChange({ name, value: newValue });
	}
	resetValue(event) {
		const { onChange, name } = this.props;
		if (event && event.type === "click" && event.button !== 0) return;

		event.stopPropagation();
		event.preventDefault();

		this.setState(assoc("inputValue", ""), () => {
			if (this.input) this.input.focus();
			onChange({ name, value: [] });
		});
	}
}

export default MultipleInput;
