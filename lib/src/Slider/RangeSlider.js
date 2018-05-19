import React from "react";
import Tracker from "./Tracker";
import CoreSlider from "./CoreSlider";
import { BLUE3 } from "../_colors";
import HandlerComponent from "./Handler";

const Progress = Tracker.extend`
	background: ${BLUE3};
`;

class RangeSlider extends CoreSlider {
	static displayName = "HO.Slider.Range";

	static defaultProps = {
		disabled: false,
		labelStepSize: 10,
		max: 100,
		min: 0,
		showTrackFill: true,
		stepSize: 1,
	};

	handles = [];

	renderFill = () => {
		const { min, value } = this.props;
		const { tickSize } = this.state;

		const [leftValue, rightValue] = value;
		if (leftValue === rightValue) {
			return undefined;
		}
		let left = Math.round((leftValue - min) * tickSize) - 1;
		let width = Math.round((rightValue - leftValue) * tickSize) + 2;
		if (width < 0) {
			left += width;
			width = Math.abs(width);
		}
		return <Progress style={{ left, width }} />;
	};

	renderHandles = () => {
		const { disabled, max, min, onRelease, stepSize, value } = this.props;
		const { tickSize } = this.state;

		const generateHandle = (val, index) => (
			<HandlerComponent
				max={max}
				min={min}
				value={val}
				key={index}
				label={value}
				tickSize={tickSize}
				disabled={disabled}
				stepSize={stepSize}
				ref={this.addHandleRef}
				onRelease={this.getHandlerForIndex(index, onRelease)}
				onChange={this.getHandlerForIndex(index, this.handleChange)}
			/>
		);

		return value.map(generateHandle);
	};

	addHandleRef = ref => {
		if (ref != null) {
			this.handles.push(ref);
		}
	};

	handleTrackClick = event => {
		this.handles
			.reduce((min, handle) => {
				// find closest handle to the mouse position
				const value = handle.clientToValue(event.clientX);
				return this.nearestHandleForValue(value, min, handle);
			})
			.beginHandleMovement(event);
	};

	nearestHandleForValue = (value, firstHandle, secondHandle) => {
		const firstDistance = Math.abs(value - firstHandle.props.value);
		const secondDistance = Math.abs(value - secondHandle.props.value);
		return secondDistance < firstDistance ? secondHandle : firstHandle;
	};

	getHandlerForIndex = (index, callBack) => newValue => {
		const [leftValue, rightValue] = this.props.value;
		if (callBack) {
			if (index === 0) {
				return callBack([Math.min(newValue, rightValue), rightValue]);
			}
			return callBack([leftValue, Math.max(newValue, leftValue)]);
		}
	};
	handleChange = newValue => {
		const { value, onChange } = this.props;
		const [leftValue, rightValue] = value;

		const [newLeftValue, newRightValue] = newValue;
		if (leftValue !== newLeftValue || rightValue !== newRightValue) {
			if (onChange) return onChange(newValue);
		}
	};
}

export default RangeSlider;
