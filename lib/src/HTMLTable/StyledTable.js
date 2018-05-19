import styled, { css } from "styled-components";
import { blackWithAlpha, LIGHT_GRAY5 } from "../_colors";

export default styled.table`
	${props => {
		if (!props.border) return;
		return css`
			border-collapse: collapse;
			border: 1px solid ${blackWithAlpha(0.2)};

			& th,
			& td {
				border: 1px solid ${blackWithAlpha(0.2)};
			}

			& tr {
				&:hover {
					background-color: ${LIGHT_GRAY5};
				}
			}
		`;
	}};
`;
