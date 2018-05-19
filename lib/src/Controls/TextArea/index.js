import React from "react";
import StyledTextArea from "./StyledTextArea";

const TextArea = ({ onChange, ...props }) => {
	const handleChange = e => {
		e.preventDefault();
		const { name, value } = e.currentTarget;
		if (onChange) return onChange({ value, name });
	};
	return <StyledTextArea onChange={handleChange} {...props} />;
};
TextArea.displayName = "HO.TextArea";

export default TextArea;
