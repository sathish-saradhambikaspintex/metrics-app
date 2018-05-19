import * as COLOR from "./_colors";
import * as VARS from "./_variables";
import { injectGlobal } from "styled-components";

/* eslint-disable */

injectGlobal`
  /**
   * 1. Change the default font family in all browsers (opinionated).
   * 2. Prevent adjustments of font size after orientation changes in IE and iOS.
   */
  html {
    font-family: sans-serif;
  }

	[type="checkbox"],
	[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

	button,
	input {
    overflow: visible;
  }

	button,
	input,
	select,
	textarea {
    font: inherit;
    margin: 0;
  }

	*,
	*::before,
	*::after {
    box-sizing: inherit;
  }

  ::selection {
    background: ${COLOR.textSelectionColor};
  }

  :focus {
    outline: rgba(19, 124, 189, 0.5) auto 2px;
    outline-offset: 2px;
    -moz-outline-radius: 6px;
  }

  body {
    margin: 0;
    color: ${COLOR.textColor};
    text-transform: none;
    line-height: ${VARS.lineHeight};
    letter-spacing: 0;
    font-family: ${VARS.fontFamily};
    font-size: ${VARS.fontSize}px;
    font-weight: 400;
  }

  small {
    font-size: ${VARS.fontSizeSmall}px;
  }

  p {
    margin: 0 0 ${VARS.gridSize}px;
    padding: 0;
  }

  /* LISTS */
	ol,
	ul {
    margin: ${VARS.gridSize}px 0;
    padding-left: ${VARS.gridSize * 4}px;
  }
`;
/* eslint-enable */
