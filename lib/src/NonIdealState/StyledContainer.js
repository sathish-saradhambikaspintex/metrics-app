import styled from "styled-components";

export default styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	width: 100%;
	max-width: 400px;
	height: 100%;
	& > :not(:last-child) {
		margin-bottom: 14px;
	}
`;
