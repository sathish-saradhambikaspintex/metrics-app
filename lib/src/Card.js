import styled from "styled-components";
import { prop, __ } from "ramda";
import * as COLOR from "./_colors";
import * as VARS from "./_variables";

function borderShadow({ h = "0", v = "0", blur = "0", spread = "0", color = COLOR.BLACK, alpha = 1 }) {
	return `${h}px ${v}px ${blur}px ${spread}px ${COLOR.colorWithAlpha(color, alpha)}`;
}

const BS_ELE_1 = `
  ${borderShadow({ spread: 1, alpha: 0.15 })},
  ${borderShadow({ alpha: 0 })},
  ${borderShadow({ v: 1, blur: 1, alpha: 0.2 })}
`;
const BS_ELE_2 = `
  ${borderShadow({ spread: 1, alpha: 0.15 })},
  ${borderShadow({ v: 2, blur: 4, alpha: 0.2 })},
  ${borderShadow({ v: 8, blur: 24, alpha: 0.2 })}
`;
const BS_ELE_3 = `
  ${borderShadow({ spread: 1, alpha: 0.15 })},
  ${borderShadow({ v: 4, blur: 8, alpha: 0.2 })},
  ${borderShadow({ v: 18, blur: 46, spread: 6, alpha: 0.2 })}
`;

const getBSFor = prop(__, [null, BS_ELE_1, BS_ELE_2, BS_ELE_3]);
const Card = styled.div`
	border-radius: ${VARS.borderRadius}px;
	box-shadow: ${props => (props.elevation ? getBSFor(props.elevation * 1) : getBSFor(1))};
	background-color: ${COLOR.WHITE};
	padding: ${VARS.gridSize}px ${VARS.gridSize * 1.5}px;

	&:hover {
		cursor: pointer;
		box-shadow: ${getBSFor(3)};
	}
`;

Card.displayName = "HO.Card";
export default Card;
