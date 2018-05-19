import styled from "styled-components";

import * as COLOR from "../_colors";
import * as VARS from "../_variables";

const Tracker = styled.div`
	position: absolute;
	top: ${VARS.halfGridSize}px;
	right: 0;
	left: 0;
	border-radius: ${VARS.borderRadius}px;
	background: ${COLOR.GRAY1};
	height: ${VARS.halfGridSize + 1}px;
`;

Tracker.displayName = "HO.Slider.Tracker";

export default Tracker;
