import styled from "styled-components";

export default styled.div`
	width: ${props => (props.width ? `${props.width}px` : "inherit")};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-wrap: normal;
`;
