import styled, { css } from "styled-components";

export default styled.div`
	margin-top: ${props => (props.vertical ? "0px" : "20px")};

	${props => {
		if (!props.vertical) return;
		return css`
			padding-left: 20px;
		`;
	}};
`;
