import { reverse } from "ramda";
import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../_colors";
import { disabled, colorAndBg, sizer } from "../_style-utils";

export default styled.li`
	display: flex;
	flex-direction: row;
	align-items: center;
	user-select: none;
	${props => {
		const { intent = "default", size } = props;
		const color = reverse(ALT_INTENTS[intent]);
		return css`
		${sizer(size)};
		${disabled(color)};
			${colorAndBg(color, "hover")};
		`;
	}};
`;
