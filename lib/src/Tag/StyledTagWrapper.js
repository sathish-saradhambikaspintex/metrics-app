import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../_colors";
import { border, disabled, colorAndBg, sizer } from "../_style-utils";

export default styled.span`
	position: relative;
	align-items: center;
	cursor: ${props => props.onClick && "pointer"};
	&:not(:first-child) {
		margin-left: 5px;
	}
	${props => {
		const { intent = "default", size, round, minimal = false } = props;
		const color = ALT_INTENTS[intent];
		const borderRadius = round ? 10 : 3;
		const effect = minimal ? "hover" : "none";
		return css`
			${sizer(size)};
			${border(color, borderRadius)};
			${disabled(color)};
			${colorAndBg(color, effect)};
		`;
	}};
`;
