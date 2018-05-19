import React from "react";
import { curry } from "ramda";

import Tracker from "./Tracker";
import CoreSlider from "./CoreSlider";
import * as COLOR from "../_colors";
import HandlerComponent from "./Handler";

const Progress = Tracker.extend`
	background: ${COLOR.BLUE3};
`;

const clamp = curry((min, max, val) => Math.min(Math.max(val, min), max));

class Slider extends CoreSlider {
	static displayName = "HO.Slider";

	static defaultProps = {
		disabled: false,
		initialValue: 0,
		labelStepSize: 10,
		max: 100,
		min: 0,
		showTrackFill: true,
		stepSize: 1,
		value: 0,
	};

	renderFill = () => {
		const { min, max, value } = this.props;
		const { tickSize } = this.state;

		let initialValue = clamp(min, max, this.props.initialValue);
		let left = Math.round((initialValue - min) * tickSize);
		let width = Math.round((value - initialValue) * tickSize);
		if (width < 0) {
			left += width;
			width = Math.abs(width);
		}
		return <Progress style={{ left, width }} />;
	};

	renderHandles = () => {
		const { disabled, max, min, onChange, stepSize, value } = this.props;
		const { tickSize } = this.state;

		return (
			<HandlerComponent
				max={max}
				min={min}
				value={value}
				tickSize={tickSize}
				onChange={onChange}
				disabled={disabled}
				stepSize={stepSize}
				ref={this.refHandlers.handle}
			/>
		);
	};

	handleTrackClick = event => {
		if (this.handleElement != null) {
			this.handleElement.beginHandleMovement(event);
		}
	};
}

export default Slider;
