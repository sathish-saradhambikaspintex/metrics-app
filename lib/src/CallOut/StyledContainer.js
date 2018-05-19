import styled from "styled-components";
import { ALT_INTENTS } from "../_colors";

export default styled.div`
	line-height: 1.5;
	position: relative;
	padding: 10px 12px 9px;
	font-size: 14px;
	border-radius: 4px;
	background-color: ${props => props.intent && ALT_INTENTS[props.intent][1]};
`;
