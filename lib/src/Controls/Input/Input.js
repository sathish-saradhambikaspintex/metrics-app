import React, { Component } from "react";
import { propOr, identity, omit, merge } from "ramda";
import StyledInput from "./StyledInput";
import StyledInputGroup from "./StyledInputGroup";
import StyledGroupInputElement from "./StyledGroupInputElement";
import parsers from "./parsers";
import formatters from "./formatters";
import getIcon from "./getIcon";

class Input extends Component {
	static displayName = "HO.Input";
	setInputRef = ref => (this.input = ref);
	getInputProps = () => omit(["children", "icon"], this.props);
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);

		if (!(props.disabled || props.readOnly) && !props.onChange) {
			throw new Error("onChange handler has not been defined");
		}
		if (props.type === "checkbox") {
			throw new Error("Usage of input type checkbox is not correct. Use HO.Checkbox component instead");
		}
	}

	render() {
		const { children, icon, rightIcon } = this.props;

		if (children || icon || rightIcon) return this.renderInputGroup();
		return this.renderInput();
	}
	renderInput() {
		const others = this.getInputProps();
		const { type, disabled, readOnly, value, onChange } = others;

		const formatter = propOr(identity, type, formatters);
		return (
			<StyledInput
				{...others}
				innerRef={this.setInputRef}
				value={formatter(value)}
				onChange={!onChange || disabled || readOnly ? undefined : this.handleInputChange}
			/>
		);
	}
	renderInputGroup() {
		const { children, icon, rightIcon } = this.props;
		const { disabled, readOnly } = this.getInputProps();
		const modifiedLeftElement = getIcon(icon);
		const modifiedRightElement = getIcon(rightIcon, { margin: "auto" });
		return (
			<StyledInputGroup tabIndex="0" disabled={disabled} readOnly={readOnly}>
				{modifiedLeftElement.element}
				{children}
				{this.renderGroupInput()}
				{modifiedRightElement.element}
			</StyledInputGroup>
		);
	}
	renderGroupInput() {
		const others = this.getInputProps();
		const { type, disabled, readOnly, value, onChange } = others;

		const formatter = propOr(identity, type, formatters);
		return (
			<StyledGroupInputElement
				{...others}
				tabIndex="-1"
				innerRef={this.setInputRef}
				value={formatter(value)}
				onChange={!onChange || disabled || readOnly ? undefined : this.handleInputChange}
			/>
		);
	}

	// EVENTS
	handleInputChange(event) {
		event.preventDefault();
		const name = event.currentTarget.name;
		const rawValue = event.currentTarget.value;
		const { type, onChange } = this.props;
		const parser = propOr(identity, type, parsers);
		const value = parser(rawValue);
		if (name != null && name !== "") return onChange({ value, name });
		return onChange(value);
	}
	focus() {
		if (this.input) this.input.focus();
	}
	blur() {
		if (this.input) this.input.blur();
	}
	getBoundingClientRect() {
		if (this.input) return this.input.getBoundingClientRect();
	}
}

export default Input;
