import styled from "styled-components";
import { INTENTS } from "../_colors";
import { fontSizeLarge } from "../_variables";
import { border, colorAndBg } from "../_style-utils";
const color = INTENTS.default.color;
const borderColor = INTENTS.default.borderColor;

const Handle = styled.span`
	top: 0;
	left: 0;
	cursor: pointer;
	position: absolute;
	width: ${fontSizeLarge}px;
	height: ${fontSizeLarge}px;
	&:hover {
		cursor: grab;
		z-index: 2;
	}

	${border(borderColor)};
	${colorAndBg(color)};
`;

Handle.displayName = "HO.Slider.Handle";

export default Handle;
