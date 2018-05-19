import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../../_colors";
import { truncate, border, disabled, readOnly, sizer } from "../../_style-utils";

export default styled.textarea`
	display: block;
	width: 100%;
	appearance: none;
	overflow: visible;
	vertical-align: middle;
	margin-bottom: 7px;
	${props => {
		const { intent = "default", size, round } = props;
		const color = ALT_INTENTS[intent][1];
		const borderRadius = round ? 30 : 2;
		return css`
			${truncate("150px")};
			${border(color, borderRadius)};
			${readOnly(color)};
			${disabled(color)};
			${sizer(size)};
		`;
	}};
`;
