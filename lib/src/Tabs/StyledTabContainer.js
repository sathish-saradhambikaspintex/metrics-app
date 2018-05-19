import styled, { css } from "styled-components";

export default styled.div`
	&:focus {
		outline: rgba(19, 124, 189, 0.5) auto 2px;
		outline-offset: 2px;
	}
	${props => {
		if (!props.vertical) return;
		return css`
			display: flex;
		`;
	}};
`;
