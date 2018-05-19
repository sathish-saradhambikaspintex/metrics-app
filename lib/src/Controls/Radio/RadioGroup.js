import Radio from "./Radio";
import StyledGroup from "./StyledGroup";
import React, { Component } from "react";
import { addIndex, map, prop } from "ramda";

const mapIndexed = addIndex(map);
class RadioGroup extends Component {
	static displayName = "HO.Controls.Radio.Group";
	static defaultProps = {
		labelKey: "label",
		valueKey: "value",
	};
	constructor(props) {
		super(props);
		this.renderRadioButtons = this.renderRadioButtons.bind(this);
		this.handleInputClick = this.handleInputClick.bind(this);
		if (props.items && props.children) {
			throw new Error("Both items and children cannot be given");
		}
		if (props.items.length > 5) {
			throw new Error("Don't you think this would be better with Select");
		}
	}

	render() {
		const { items, children } = this.props;
		if (items) {
			return <StyledGroup>{mapIndexed(this.renderRadioButtons, items)}</StyledGroup>;
		} else {
			return <StyledGroup>{children}</StyledGroup>;
		}
	}
	renderRadioButtons(item, index) {
		const { labelKey, valueKey, name, value } = this.props;
		const itemValue = prop(valueKey, item);
		const itemText = prop(labelKey, item);
		const checked = itemValue && value ? value === itemValue : false;
		return (
			<Radio
				name={name}
				index={index}
				checked={checked}
				key={name + index}
				onChange={this.handleInputClick}
				text={itemText}
				value={itemValue}
			/>
		);
	}

	// EVENTS
	handleInputClick(event) {
		const { name, onChange } = this.props;
		const value = event.target.value;
		if (onChange) return onChange({ name, value });
	}
}

export default RadioGroup;
