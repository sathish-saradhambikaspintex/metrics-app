import React from "react";
import styled, { keyframes, css } from "styled-components";

import * as COLOR from "../_colors";

const animation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
	display: inline-block;
	width: 50px;
	${({ small }) =>
		small &&
		css`
			width: 24px;
		`};
	${({ large }) =>
		large &&
		css`
			width: 100px;
		`};
`;

const SpinnerSvgContainer = styled.div`
	position: relative;
	width: 100%;
	height: 0;
	padding: 0;
	padding-bottom: 100%;
	animation: ${({ value }) => (value ? "none" : `${animation} 400ms linear infinite`)};
`;

const SpinnerTrackPath = styled.path`
	stroke: ${COLOR.colorWithAlpha(COLOR.GRAY1, 0.2)};
	fill-opacity: 0;
	stroke-width: 5px;
	${(large = false) =>
		large &&
		css`
			stroke-width: 3px;
		`};
	${(small = false) =>
		small &&
		css`
			stroke-width: 7px;
		`};
`;

const SpinnerHeadPath = styled.path`
	transition: stroke-dashoffset 200ms cubic-bezier(0.4, 1, 0.75, 0.9);
	stroke: ${({ intent = "default" }) => COLOR.INTENTS[intent].bgColor};
	stroke-linecap: round;
	fill-opacity: 0;
	stroke-width: 5px;
	${(large = false) =>
		large &&
		css`
			stroke-width: 3px;
		`};
	${(small = false) =>
		small &&
		css`
			stroke-width: 7px;
		`};
	${({ value }) =>
		value &&
		css`
			stroke-dasharray: 280, 280;
			stroke-dashoffset: ${Math.round(280 * (1 - value))};
		`};
`;

const Spinner = ({ small, large, value, intent, style }) => {
	return (
		<SpinnerContainer small={small} large={large} style={style}>
			<SpinnerSvgContainer value={value}>
				<svg viewBox="0 0 100 100">
					<SpinnerTrackPath
						small={small}
						large={large}
						d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
					/>
					{value ? (
						<SpinnerHeadPath
							small={small}
							large={large}
							intent={intent}
							pathLength={value && "280"}
							value={value}
							d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
						/>
					) : (
						<SpinnerHeadPath small={small} large={large} intent={intent} d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5" />
					)}
				</svg>
			</SpinnerSvgContainer>
		</SpinnerContainer>
	);
};
Spinner.displayName = "HO.Spinner";

export default Spinner;
