import React from "react";
import styled, { css, keyframes } from "styled-components";

import * as COLOR from "../_colors";

const StyledProgressBar = styled.div`
	margin-bottom: 10px;
	display: block;
	position: relative;
	border-radius: 40px;
	background: ${COLOR.colorWithAlpha(COLOR.GRAY1, 0.2)};
	width: 100%;
	height: 8px;
	overflow: hidden;
`;

const animation = keyframes`
  from { background-position: 0 0; }
  to { background-position: 30px 0; }
`;

let ProgressMeter = StyledProgressBar.withComponent("div");

ProgressMeter = ProgressMeter.extend`
	display: inline-block;
	position: absolute;
	border-radius: 40px;
	background: linear-gradient(
		-45deg,
		rgba(255, 255, 255, 0.2) 25%,
		transparent 25%,
		transparent 50%,
		rgba(255, 255, 255, 0.2) 50%,
		rgba(255, 255, 255, 0.2) 75%,
		transparent 75%
	);
	background-color: ${COLOR.colorWithAlpha(COLOR.GRAY1, 0.8)};
	background-size: 30px 30px;
	width: ${props => (props.value ? props.value : 50)}%;
	height: 100%;
	transition: width 200ms cubic-bezier(0.4, 1, 0.75, 0.9);
	${props =>
		!props.nostripes &&
		!props.noanimation &&
		css`
			animation: ${animation} 300ms linear infinite reverse;
		`};
	${props =>
		props.nostripes &&
		css`
			background-image: none;
		`};
	${props =>
		props.fill &&
		css`
			width: 100%;
		`};
	${props => {
		const { intentType = "default" } = props;
		return css`
			background-color: ${COLOR.INTENTS[intentType].bgColor};
		`;
	}};
	`;

const ProgressBar = ({ fill, intent, nostripes, noanimation, value }) => {
	return (
		<StyledProgressBar>
			<ProgressMeter fill={fill} intent={intent} nostripes={nostripes} noanimation={noanimation} value={value} />
		</StyledProgressBar>
	);
};
StyledProgressBar.displayName = "HO.PregressBar";
ProgressMeter.displayName = "HO.ProgressMeter";

export default ProgressBar;
