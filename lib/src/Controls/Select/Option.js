import React, { PureComponent } from "react";
import styled from "styled-components";
import * as COLORS from "../../_colors";

const StyledOption = styled.div`
	background: ${COLORS.WHITE};
	cursor: pointer;
	padding: 5px;
	margin: 5px;
	box-sizing: border-box;
`;

class Option extends PureComponent {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	render() {
		const { children, disabled, index } = this.props;
		const tabIndex = index + 1;
		const optionProps = {
			onMouseDown: this.handleMouseDown,
			onClick: disabled ? this.blockEvent : this.handleClick,
		};

		return (
			<StyledOption id={`option-${tabIndex}`} {...optionProps} tabIndex={tabIndex}>
				{children}
			</StyledOption>
		);
	}

	blockEvent(event) {
		event.preventDefault();
		event.stopPropagation();
		if (event.target.tagName !== "A" || !("href" in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	}
	handleMouseDown(event) {
		event.preventDefault();
	}
	handleClick(event) {
		const { valueOption, onSelect } = this.props;
		return onSelect(valueOption, event);
	}
}

export default Option;
