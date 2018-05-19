import styled from "styled-components";

import * as COLOR from "./_colors";
import * as VARS from "./_variables";

const BlockQuote = styled.blockquote`
	line-height: ${VARS.lineHeightLarge}em;
	font-size: ${VARS.fontSizeLarge}px;
	margin: 0 0 ${VARS.gridSize}px;
	border-left: solid 4px ${COLOR.colorWithAlpha(COLOR.DARK_GRAY3, 0.5)};
	padding: 0 ${VARS.gridSize * 2}px;
`;

export default BlockQuote;
