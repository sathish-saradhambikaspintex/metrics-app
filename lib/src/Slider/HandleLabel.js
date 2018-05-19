import AxisLabel from "./AxisLabel";
import { INTENTS } from "../_colors";
import { border, colorAndBg } from "../_style-utils";
const color = INTENTS.default.color;
const borderColor = INTENTS.default.borderColor;

const HandleLabel = AxisLabel.extend`
	transform: translate(-50%, 20px);
	margin-left: 8px;
	${border(borderColor)};
	${colorAndBg(color)};
`;

HandleLabel.displayName = "HO.Slider.HandleLabel";

export default HandleLabel;
