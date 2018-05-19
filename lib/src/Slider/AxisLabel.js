import styled from "styled-components";
import * as VARS from "../_variables";

const AxisLabel = styled.div`
	display: inline-block;
	padding: ${VARS.halfGridSize / 2}px ${VARS.halfGridSize}px;
	vertical-align: top;
	line-height: 1em;
	font-size: ${VARS.fontSizeSmall}px;
	position: absolute;
	transform: translate(-50%, 20px);
`;

AxisLabel.displayName = "HO.Slider.AxisLabel";

export default AxisLabel;
