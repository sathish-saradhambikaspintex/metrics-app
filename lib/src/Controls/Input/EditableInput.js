import React from "react";
import StyledEditableWrapper from "./StyledEditableWrapper";
import StyledEditableInput from "./StyledEditableInput";
import StyledEditableText from "./StyledEditableText";
import formatters from "./formatters";
import Input from "./Input";
import { propOr, identity, assoc } from "ramda";
import getIcon from "./getIcon";

class EditableInput extends Input {
	static displayName = "HO.Input.Editable";
	setWrapperRef = ref => (this.wrapper = ref);
	state = { isEditing: false };

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		const { isEditing: curr } = this.state;
		const { isEditing: next } = nextState;
		if (curr !== next) return true;
		if (super.shouldComponentUpdate) return super.shouldComponentUpdate(nextProps);
	}
	componentDidUpdate() {
		if (super.componentDidUpdate) super.componentDidUpdate();
		if (this.state.isEditing) {
			document.addEventListener("click", this.handleOutsideClick);
		} else {
			document.removeEventListener("click", this.handleOutsideClick);
		}
	}
	render() {
		const { children, leftElement, rightElement } = this.props;
		const { isEditing } = this.state;

		const modifiedLeftIcon = getIcon(leftElement, {
			position: "absolute",
			left: 0,
			top: 0,
			zIndex: 1,
			padding: 8,
		});
		const modifiedRightIcon = getIcon(rightElement, {
			position: "absolute",
			right: 0,
			top: 0,
			zIndex: 1,
			padding: 8,
		});

		return (
			<StyledEditableWrapper onClick={this.handleClick} innerRef={this.setWrapperRef}>
				{modifiedLeftIcon.element}
				{isEditing && this.renderInput()}
				{!isEditing && this.renderEditablePlaceholder()}
				{modifiedRightIcon.element}
			</StyledEditableWrapper>
		);
	}
	renderInput() {
		const others = this.getInputProps();
		const { type, disabled, readOnly, value, onChange } = others;

		const formatter = propOr(identity, type, formatters);
		return (
			<StyledEditableInput
				{...others}
				placeholder=""
				innerRef={this.setInputRef}
				value={formatter(value)}
				onChange={!onChange || disabled || readOnly ? undefined : this.handleInputChange}
			/>
		);
	}
	renderEditablePlaceholder() {
		const others = this.getInputProps();
		const { placeholder, value, type } = others;
		const formatter = propOr(identity, type, formatters);
		return <StyledEditableText {...others}>{formatter(value) || placeholder}</StyledEditableText>;
	}

	// EVENTS
	handleClick() {
		this.setState(assoc("isEditing", true), this.focus);
	}
	handleOutsideClick(event) {
		const target = event.target;
		const isClickInTarget = this.wrapper && this.wrapper.contains(target);
		if (!isClickInTarget) {
			this.setState(assoc("isEditing", false));
		}
	}
}

export default EditableInput;
