import styled from "styled-components";
import * as COLOR from "../_colors";
import * as VARS from "../_variables";

const NavbarDivider = styled.div`
	margin: 0 ${VARS.gridSize}px;
	border-left: 1px solid ${COLOR.colorWithAlpha(COLOR.DARK_GRAY3, 0.15)};
`;

NavbarDivider.displayName = "HO.NavbarDivider";

export default NavbarDivider;
