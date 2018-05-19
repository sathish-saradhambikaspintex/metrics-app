import React, { PureComponent } from "react";
import { assoc, append, remove, length, map } from "ramda";
import styled from "styled-components";

import { GRAY3, GRAY1 } from "../../_colors";
import { borderRadius } from "../../_variables";
import Text from "../../Text";
import Select from "../Select/Select";
import Layout from "../../Layout";
import Tag from "../../Tag";

const Wrapper = styled.div`
	position: relative;
	outline: none;
	border: none;
	display: flex;
	align-items: center;
	border: ${props => (props.focus ? `1px solid ${COLOR.GRAY3}` : `1px solid ${COLOR.GRAY1}`)};
	border-radius: ${borderRadius}px;
	& > input {
		width: 100%;
		background: none transparent;
		border: 0 none;
		box-shadow: none;
		cursor: default;
		display: inline-block;
		font-family: inherit;
		font-size: inherit;
		margin: 0;
		outline: none;
		line-height: 14px;
		padding: 5px 10px;
		-webkit-appearance: none;
	}
`;

class FormulaInput extends PureComponent {
	static displayName = "HO.Input.Formula";
	state = {};
	setInputRef = ref => (this.input = ref);

	constructor() {
		super();

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleRemoveTag = this.handleRemoveTag.bind(this);
	}

	render() {
		const { getFormulaFields, getTableFields } = this.props;

		return [
			<Layout.Row key="tableField" style={{ padding: 0 }}>
				<Text.Label text="Table fields" />
				<Select fill value={""} onChange={this.handleFieldChange} options={getTableFields} />
			</Layout.Row>,
			<Layout.Row key="dbField" style={{ padding: 0 }}>
				<Text.Label text="DB fields" />
				<Select.Async fill value={""} onChange={this.handleFieldChange} loadOptions={getFormulaFields} />
			</Layout.Row>,
			this.renderFunctionFields(),
			this.renderFormulaDefinitionWrapper(),
		];
	}
	renderFunctionFields() {
		const fns = ["SUM", "PRODUCT"];
		const getFunctionTags = text => <Tag text={text} onClick={() => this.handleFieldChange({ value: text })} />;
		return (
			<Layout.Row key="functionField" style={{ padding: 0 }}>
				{map(getFunctionTags, fns)}
			</Layout.Row>
		);
	}
	renderFormulaDefinitionWrapper() {
		const { formulaValue } = this.state;
		return <Wrapper key="formulaDefinitionArea">{formulaValue}</Wrapper>;
	}

	handleFieldChange({ value }) {
		const formulaValueTagCount = length(this.state.formulaValue);
		const tag = this.getTag(value, formulaValueTagCount);
		const formulaValue = append(tag, this.state.formulaValue);
		this.setState(assoc("formulaValue", formulaValue));
	}
	handleRemoveTag(index) {
		const formulaValue = remove(index, 1, this.state.formulaValue);
		this.setState(assoc("formulaValue", formulaValue));
	}

	getTag(value, index) {
		return <Tag key={index} text={value} onClose={() => this.handleRemoveTag(index)} />;
	}
}

export default FormulaInput;
