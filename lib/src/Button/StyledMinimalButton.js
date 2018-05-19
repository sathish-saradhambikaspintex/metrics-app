import StyledButton from "./StyledButton";
import { css } from "styled-components";
import { ALT_INTENTS } from "../_colors";
import { colorAndBg, border } from "../_style-utils";

export default StyledButton.extend`
	${props => {
		const { intent = "default" } = props;
		const color = ALT_INTENTS[intent];
		return css`
			${border()};
			${colorAndBg(color, "hoverOnly")};
		`;
	}};
`;
