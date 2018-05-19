import styled from "styled-components";
import * as COLOR from "../_colors";

export default styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 20;
	background-color: ${COLOR.blackWithAlpha(0.7)};
	overflow: auto;

	&:focus {
		outline: none;
	}
`;
