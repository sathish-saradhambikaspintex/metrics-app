import React from "react";

import Svg from "./Svg";
import Path from "./Path";
import * as VARS from "../_variables";

const Icon = ({ fill, size = VARS.iconSizeSmall, alignRight = false, viewBox, children }) => {
	return (
		<Svg fill={fill} alignRight={alignRight} width={size} height={size} viewBox={viewBox}>
			{children}
		</Svg>
	);
};

Icon.displayName = "HO.SvgIcon";

export default Icon;
export { Svg, Path };
