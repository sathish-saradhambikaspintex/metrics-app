import React from "react";
import { INTENTS } from "../_colors";
import { Popover } from "./index";

const Tooltip = ({
	children,
	intent = "primary",
	isDisabled = false,
	hoverCloseDelay = 0,
	hoverOpenDelay = 100,
	rootElementTag,
	transitionDuration = 100,
	openOnTargetFocus = true,
	position = "right",
	useSmartPositioning = false,
	useSmartArrowPositioning = true,
	...otherProps
}) => {
	const style = {
		background: INTENTS[intent].bgColor,
		color: INTENTS[intent].color,
		padding: "10px 12px",
	};

	return (
		<Popover
			{...otherProps}
			style={style}
			lazy={true}
			intent={intent}
			position={position}
			canEscapeKeyClose={false}
			openOnTargetFocus={openOnTargetFocus}
		>
			<span>{children}</span>
		</Popover>
	);
};

Tooltip.displayName = "HO.Tooltip";

export default Tooltip;
