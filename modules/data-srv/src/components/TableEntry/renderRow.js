/* eslint-disable react/display-name */
import React from "react";
import { concat } from "ramda";
import getUIElement from "./getUIElement";
import getErrorElement from "./getErrorElement";
import { Text, Controls } from "lib";

export default function renderRow(layoutType, props) {
	let LayoutElement = Controls.Group;
	if (layoutType === "inline") LayoutElement = Controls.Group.Inline;

	const { title, name, required, validators, ...others } = props;
	const uIElementProps = { ...others, name };
	const errorElementProps = { ...others, validators, name };

	const key = concat(name, "-input-row");
	return (
		<LayoutElement key={key} data-key={key} width={30}>
			<Controls.Label intent={required ? "danger" : undefined}>
				{title}
				{required && <Text.Muted>  (required)</Text.Muted>}
			</Controls.Label>
			{getUIElement(uIElementProps)}
			{getErrorElement(errorElementProps)}
		</LayoutElement>
	);
}
