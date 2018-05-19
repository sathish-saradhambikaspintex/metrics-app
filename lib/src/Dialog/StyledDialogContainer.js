import styled from "styled-components";
import * as COLOR from "../_colors";
import * as VARS from "../_variables";

export default styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 15%;
	left: calc(50% - ${VARS.gridSize * 25}px);

	/* add bottom margin for overflow scrolling scenarios */
	margin-bottom: ${VARS.gridSize * 2}px;
	border-radius: ${VARS.borderRadius * 2}px;
	background: ${COLOR.LIGHT_GRAY4};
	width: ${VARS.gridSize * 50}px;
	padding-bottom: ${VARS.gridSize * 2}px;
	z-index: 40;

	&:focus {
		outline: 0;
	}
`;
