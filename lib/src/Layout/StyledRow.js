import styled, { css } from "styled-components";
import { WHITE, blackWithAlpha } from "../_colors";
import { halfGridSize, gridSize } from "../_variables";
import { map, is, concat, toString } from "ramda";

export default styled.div`
	background: ${WHITE};
	display: flex;
	flex: 1;

	${props => {
		const { height, rightAlign = false, divider = false, sticky = {}, spaced } = props;
		const convertStickyParams = prop => (is(Number, prop) ? concat(toString(prop), "px") : prop);
		const newProps = map(convertStickyParams, sticky);
		const { top = "auto", left = "auto", right = "auto", bottom = "auto" } = newProps;

		return css`
			${height && `height : calc(100vh - ${height}px)`};
			${rightAlign && "justify-content: flex-end"};
			${divider && `border-bottom: 1.5px solid ${blackWithAlpha(0.1)}`};
			${spaced &&
				`
				flex: 0;
				padding: ${halfGridSize}px ${gridSize * 1.5}px;
					`};
			${sticky &&
				`
				position: sticky;
				top: ${top};
				left: ${left};
				right: ${right};
				bottom: ${bottom};
					`};
		`;
	}};
`;
