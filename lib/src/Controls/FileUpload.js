import React, { Component } from "react";
import styled, { css } from "styled-components";

import * as COLOR from "../_colors";
import * as VARS from "../_variables";

const StyledFileUpload = styled.label`
	cursor: pointer;
	position: relative;
	display: inline-block;
	height: ${VARS.gridSize * 3}px;
	& > input {
		margin: 0;
		opacity: 0;
		min-width: 200px;
	}
	& > span {
		top: 0;
		left: 0;
		right: 0;
		border: none;
		outline: none;
		padding: 0 10px;
		font-weight: 400;
		appearance: none;
		user-select: none;
		position: absolute;
		color: ${COLOR.GRAY1};
		vertical-align: middle;
		border-top-right-radius: 0;
		color: ${COLOR.DARK_GRAY1};
		background: ${COLOR.WHITE};
		font-size: ${VARS.fontSize}px;
		border-bottom-right-radius: 0;
		height: ${VARS.gridSize * 3}px;
		line-height: ${VARS.gridSize * 3}px;
		margin-right: ${VARS.gridSize * 7}px;
		border-radius: ${VARS.borderRadius}px;
		box-shadow: ${({ intent = "default" }) => COLOR.INTENTS[intent].boxShadow};
		transition: box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9);

		${props =>
			props.large &&
			css`
				height: ${VARS.gridSize * 4}px;
				font-size: ${VARS.fontSize + 2}px;
				line-height: ${VARS.gridSize * 4}px;
				margin-right: ${VARS.gridSize * 8.5}px;
			`};
		&::after {
			top: 0;
			right: 0;
			left: 100%;
			padding: 0 10px;
			content: "Browse";
			margin-left: -1px;
			position: absolute;
			text-align: center;
			background: #f5f8fa;
			border-top-left-radius: 0;
			color: ${COLOR.DARK_GRAY1};
			border-bottom-left-radius: 0;
			width: ${VARS.gridSize * 7}px;
			height: ${VARS.gridSize * 3}px;
			line-height: ${VARS.gridSize * 3}px;
			border-radius: ${VARS.borderRadius}px;
			box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
			background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0)) left no-repeat, center no-repeat #f5f8fa;

			${props =>
				props.large &&
				css`
					height: ${VARS.gridSize * 4}px;
					font-size: ${VARS.fontSize + 2}px;
					line-height: ${VARS.gridSize * 4}px;
					margin-right: ${VARS.gridSize * 8.5}px;
				`};
		}
	}

	${props =>
		props.fill &&
		css`
			width: 100%;
		`};
	${props =>
		props.disabled &&
		css`
			resize: none;
			box-shadow: none;
			cursor: not-allowed;
			color: ${COLOR.colorWithAlpha(COLOR.GRAY1, 0.5)};
			background: ${COLOR.colorWithAlpha(COLOR.LIGHT_GRAY1, 0.5)};
		`};
`;

export default class FileUpload extends Component {
	static displayName = "HO.FileUpload";

	render() {
		const { inputRef, value } = this.props;

		return (
			<StyledFileUpload>
				<input type="file" value={value} innerRef={inputRef} onChange={this.onChange} />
				<span>choose file...</span>
			</StyledFileUpload>
		);
	}
}
