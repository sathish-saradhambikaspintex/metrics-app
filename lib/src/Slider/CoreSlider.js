import Tracker from "./Tracker";
import { times, map } from "ramda";
import styled from "styled-components";
import React, { PureComponent } from "react";

import AxisLabel from "./AxisLabel";
import * as VARS from "../_variables";

const StyledSlider = styled.div`
	position: relative;
	cursor: default;
	outline: none;
	user-select: none;
	width: ${VARS.gridSize * 10}%;
	height: ${VARS.gridSize * 4}px;
	min-width: ${VARS.gridSize * 15}px;
	margin: ${VARS.gridSize}px ${VARS.gridSize * 2}px;
`;

class CoreSlider extends PureComponent {
	refHandlers = {
		track: el => (this.trackElement = el),
		handle: el => (this.handleElement = el),
	};

	constructor() {
		super();
		this.state = { tickSize: 0 };
	}

	render() {
		return (
			<StyledSlider onMouseDown={this.handleTrackClick}>
				<Tracker innerRef={this.refHandlers.track} />
				{this._maybeRenderFill()}
				{this._renderAxis()}
				{this.renderHandles()}
			</StyledSlider>
		);
	}

	componentDidMount() {
		this._updateTickSize();
	}

	componentDidUpdate() {
		this._updateTickSize();
	}

	_maybeRenderFill = () => {
		const { showTrackFill } = this.props;
		if (showTrackFill && this.trackElement != null) {
			return this.renderFill();
		}
		return undefined;
	};

	_renderAxis = () => {
		const { min, max, labelStepSize } = this.props;
		const { tickSize } = this.state;
		const steps = (max - min) / labelStepSize + 1;
		const labelIntegers = times(idx => idx * labelStepSize + min, steps);
		const labelArray = map(label => <AxisLabel style={{ left: label * tickSize }}>{label}</AxisLabel>, labelIntegers);

		return <div>{labelArray}</div>;
	};

	_updateTickSize = () => {
		const { min, max } = this.props;
		if (this.trackElement != null) {
			const tickSize = this.trackElement.clientWidth / (max - min);
			this.setState({ tickSize });
		}
	};
}

export default CoreSlider;
