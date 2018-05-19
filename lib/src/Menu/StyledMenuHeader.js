import styled from "styled-components";
import { dividerBlackColor } from "../_colors";

export default styled.li`
	margin-bottom: 5;
	font-family: inherit;
	font-size: 14px;
	font-weight: 500;
	line-height: 1.2;
	color: inherit;
	border-top: 1px solid ${dividerBlackColor};

	&:first-of-type {
		border-top: none;
	}
`;
