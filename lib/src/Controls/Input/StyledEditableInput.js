import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../../_colors";
import { colorAndBg } from "../../_style-utils";
import { reverse } from "ramda";

export default styled.input`
	border: none;
	box-shadow: none;
	background: none;
	width: 100%;
	padding: 0;
	white-space: pre-wrap;
	resize: none;
	${props => {
		const { intent = "default" } = props;
		const color = reverse(ALT_INTENTS[intent]);
		return css`
			${colorAndBg(color, "hover")};
		`;
	}};
`;
