import StyledLabel from "../Label";
import React from "react";
import { concat, toString } from "ramda";
import StyledRadioInput from "./StyledRadioInput";

function Radio(props) {
	const { text, name, checked, value, index, onChange } = props;
	let id = name;
	let stringifiedIndex = toString(index);
	if (stringifiedIndex) id = concat(id, stringifiedIndex);

	return (
		<span style={{ marginRight: 15 }}>
			<StyledRadioInput id={id} type="radio" name={name} value={value} checked={checked} onChange={onChange} />
			<StyledLabel htmlFor={id}>{text}</StyledLabel>
		</span>
	);
}

Radio.displayName = "HO.Controls.Radio";
export default Radio;
