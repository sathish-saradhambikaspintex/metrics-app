import styled from "styled-components";

export default styled.td`
	height: ${props => props.rowHeight};

	& > input,
	& > textarea {
		display: block !important;
		margin: auto !important;
	}
`;
