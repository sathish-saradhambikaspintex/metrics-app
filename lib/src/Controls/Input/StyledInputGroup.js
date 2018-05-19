import styled, { css } from "styled-components";
import { ALT_INTENTS } from "../../_colors";
import { border, sizer, disabled as applyDisabled } from "../../_style-utils";

export default styled.div`
	width: 100%;
	display: inline-flex;
	margin-bottom: 8px;

	td > & {
		margin-bottom: 0 !important;
	}

	&:focus {
		outline: rgba(19, 124, 189, 0.5) auto 2px;
	}

	${props => {
		const { intent = "default", round, size, disabled, readOnly } = props;
		const color = ALT_INTENTS[intent][1];
		const borderRadius = round ? 30 : 2;
		return css`
		${border(color, borderRadius)};
		${sizer(size, null)};
			${disabled || readOnly ? applyDisabled(color, true) : ""};
		`;
	}};
`;
