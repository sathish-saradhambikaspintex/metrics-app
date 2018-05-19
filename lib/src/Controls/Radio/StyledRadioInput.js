import styled from "styled-components";

export default styled.input`
	appearance: none;
	border-radius: 50%;
	width: 16px;
	height: 16px;
	outline: none;
	position: relative;
	top: 3px;
	transition: 0.1s border linear;
	border: 1px solid #999;

	&:checked {
		border: 4px solid black;
	}
`;
