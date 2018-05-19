import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../../_colors";
import { border, disabled, readOnly, sizer } from "../../_style-utils";

export default styled.input`
	display: block;
	appearance: none;
	overflow: visible;
	width: 100%;
	margin-bottom: 8px;
	${props => {
		const { intent = "default", size, round } = props;
		const color = ALT_INTENTS[intent][1];
		const borderRadius = round ? 30 : 2;
		return css`
			${border(color, borderRadius)};
			${readOnly(color)};
			${disabled(color)};
			${sizer(size)};
		`;
	}};
`;
