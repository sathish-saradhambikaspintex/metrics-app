import styled, { css } from "styled-components";

export default styled.div`
	display: flex;
	border-bottom: 1px solid black;
	${props => {
		if (!props.vertical) return;
		return css`
			flex-direction: column;
			align-items: flex-start;
		`;
	}};
`;
