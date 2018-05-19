import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../_colors";
import { colorAndBg, sizer } from "../_style-utils";
import { reverse } from "ramda";

const Menu = styled.ul`
	margin: 0;
	list-style: none;
	text-align: left;
	padding-top: 5px;
	padding-bottom: 5px;
	${props => {
		const { intent = "default", size } = props;
		const color = reverse(ALT_INTENTS[intent]);
		return css`
			${sizer(size, 6)};
			${colorAndBg(color, "bg")};
		`;
	}};
`;

Menu.displayName = "HO.Menu";
export default Menu;
