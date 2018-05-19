import styled from "styled-components";
import * as COLOR from "../_colors";
import * as VARS from "../_variables";

const Navbar = styled.nav`
	position: sticky;
	top: 0;
	display: flex;
	align-items: center;
	border-bottom: 1.5px solid ${COLOR.blackWithAlpha(0.1)};
	background-color: ${COLOR.WHITE};
	height: ${VARS.gridSize * 5}px;
	padding: 0 ${VARS.gridSize * 1.5}px;
`;

Navbar.displayName = "HO.NavBar";

export default Navbar;
