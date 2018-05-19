import styled from "styled-components";
import * as COLOR from "../_colors";
import * as VARS from "../_variables";

export default styled.div`
	display: flex;
	flex: 0 0 auto;
	align-items: center;
	border-radius: ${VARS.borderRadius * 2}px ${VARS.borderRadius * 2}px 0 0;
	box-shadow: 0 1px 0 rgba(16, 22, 26, 0.15);
	background: ${COLOR.WHITE};
	min-height: ${VARS.gridSize * 4}px;
	padding: 0 ${VARS.gridSize * 2}px;
	text-transform: uppercase;
	font-weight: 600;
`;
