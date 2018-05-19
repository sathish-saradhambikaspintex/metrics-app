import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../_colors";
import { colorAndBg } from "../_style-utils";

export default styled.label.attrs({
	children: props => props.text,
})`
	display: inline-block;
	margin-bottom: 5px;
	line-height: 15px;

	& + input[type="checkbox"],
	input[type="radio"] + & {
		margin-left: 12px;
	}

	${props => {
		const { intent = "default" } = props;
		const color = ALT_INTENTS[intent][1];
		return css`
			${colorAndBg(color)};
		`;
	}};
`;
