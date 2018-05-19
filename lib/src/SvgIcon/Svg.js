import styled, { css } from "styled-components";

const Svg = styled.svg`
	${props => css`
		width: ${props.width}px;
		height: ${props.height}px;
	`};
	fill: ${props => props.fill || "currentColor"};
	margin-right: 7px;
	margin-left: 3px;
	display: inline-block;
	vertical-align: middle;

	${props =>
		props.alignRight &&
		css`
			margin-right: 0;
			margin-left: 10px;
		`};
`;

export default Svg;
