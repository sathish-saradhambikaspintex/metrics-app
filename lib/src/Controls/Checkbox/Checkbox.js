import { merge, propOr } from "ramda";
import StyledLabel from "../Label";
import React, { PureComponent } from "react";

class Checkbox extends PureComponent {
	static displayName = "HO.Controls.Checkbox";
	constructor(props) {
		super(props);
		this.renderLabel = this.renderLabel.bind(this);
		this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
	}

	render() {
		const { name, text, value } = this.props;
		let style = { width: 16, height: 16 };
		if (!text) return this.renderInput(style);

		style = merge(style, {
			position: "absolute",
			top: 2,
		});
		return (
			<div style={{ position: "relative", marginBottom: 10 }}>
				{this.renderLabel()}
				{this.renderInput(style)}
			</div>
		);
	}
	renderInput(style) {
		const { name, value } = this.props;
		const id = name;
		return (
			<input style={style} id={id} type="checkbox" name={name} checked={value} onClick={this.handleCheckboxClick} />
		);
	}
	renderLabel() {
		const { text, name } = this.props;
		const id = name;
		return <StyledLabel htmlFor={id}>{text}</StyledLabel>;
	}

	// EVENTS
	handleCheckboxClick(event) {
		const { name, onChange } = this.props;
		const value = event.target.checked;

		if (onChange) {
			event.stopPropagation();
			if (name != null) return onChange({ name, value });
			return onChange(value);
		}
	}
}

export default Checkbox;
