import { blackWithAlpha } from "../_colors";
import { gridSize } from "../_variables";
import styled, { css } from "styled-components";

const Column = styled.div`
	flex: 1 1 auto;
	background: #fff;
	${props => {
		const { width, overFlow, offsetWidth, divider, noPadding = false } = props;
		return css`
			${!noPadding && `padding: ${gridSize * 1.5}px;`};
			${width && `flex: 0 0 ${width}%`};
			${overFlow && "overflow: auto"};
			${offsetWidth && `margin-left: ${offsetWidth}%`};
			${divider && `border-right: 1.5px solid ${blackWithAlpha(0.1)}`};
		`;
	}};
`;

Column.displayName = "HO.Column";
export default Column;
