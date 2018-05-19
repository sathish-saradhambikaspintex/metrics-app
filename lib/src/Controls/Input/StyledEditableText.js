import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../../_colors";
import { colorAndBg } from "../../_style-utils";
import { reverse } from "ramda";

export default styled.span`
	overflow: hidden;
	padding-right: 2px;
	text-overflow: ellipsis;
	white-space: pre;
	position: relative;
	resize: none;
	${props => {
		const { intent = "default" } = props;
		const color = reverse(ALT_INTENTS[intent]);
		return css`
			${colorAndBg(color, "hover")};
		`;
	}};
`;
