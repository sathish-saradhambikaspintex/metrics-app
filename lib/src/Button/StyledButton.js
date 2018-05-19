import { ALT_INTENTS } from "../_colors";
import { border, disabled, colorAndBg, sizer, fillSpan } from "../_style-utils";
import styled, { css } from "styled-components";

export default styled.button`
	display: inline-flex;
	align-items: baseline;
	box-sizing: border-box;
	cursor: pointer;

	button + & {
		margin-left: 7px;
	}

	&:focus {
		outline-offset: -3px !important;
	}

	${props => {
		const { intent = "default", size, fill } = props;
		const color = ALT_INTENTS[intent];
		return css`
			${sizer(size, true)};
			${border(color)};
			${disabled(color)};
			${colorAndBg(color, "hover")};
			${fillSpan(fill)};
		`;
	}};
`;
