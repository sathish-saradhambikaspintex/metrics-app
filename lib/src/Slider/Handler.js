import React, { PureComponent } from "react";
import { curry, range, indexOf } from "ramda";
import Handle from "./Handle";
import HandleLabel from "./HandleLabel";
const clamp = curry((min, max, val) => Math.min(Math.max(val, min), max));

class Handler extends PureComponent {
	static displayName = "HO.Slider.Handler";
	setHandleRef = el => (this.handleElement = el);
	state = { isMoving: false };
	componentWillUnmount() {
		this.removeDocumentEventListeners();
	}
	render() {
		const { min, tickSize, value } = this.props;
		const handleSize = this.handleElement == null ? 0 : this.handleElement.getBoundingClientRect().height;

		return (
			<Handle style={{ left: Math.round((value - min) * tickSize - handleSize / 2) }}>
				<HandleLabel
					tabIndex="0"
					onKeyDown={this._handleKeyDown}
					onKeyUp={this._handleKeyUp}
					onMouseDown={this._beginHandleMovement}
					innerRef={this.setHandleRef}
				>
					<span>{value}</span>
				</HandleLabel>
			</Handle>
		);
	}

	_handleKeyDown = e => {
		const { stepSize, value } = this.props;
		if (e.keyCode === 40 || e.keyCode === 37) {
			this._changeValue(value - stepSize);
		} else if (e.keyCode === 38 || e.keyCode === 39) {
			this._changeValue(value + stepSize);
		}
	};
	_handleKeyUp = e => {
		const { value } = this.props;
		const arrowKeys = range(37, 41);
		if (indexOf(e.which, arrowKeys) >= 0) {
			if (this._changeValue) return this._changeValue(value);
		}
	};
	_beginHandleMovement = event => {
		document.addEventListener("mousemove", this.handleHandleMovement);
		document.addEventListener("mouseup", this.endHandleMovement);
		this.setState({ isMoving: true });
		this._changeValue(this._clientToValue(event.clientX));
	};
	_changeValue = newValue => {
		const { min, max, onChange } = this.props;
		newValue = clamp(min, max, newValue);
		if (onChange) return onChange(newValue);
	};

	/** Convert client pixel to value between min and max. */
	_clientToValue = clientPixel => {
		const { stepSize, tickSize, value } = this.props;
		if (this.handleElement == null) {
			return value;
		}
		const handleRect = this.handleElement.getBoundingClientRect();
		const handleCenterPixel = handleRect.left + handleRect.width / 2;
		const pixelDelta = clientPixel - handleCenterPixel;
		const valueDelta = Math.round(pixelDelta / (tickSize * stepSize)) * stepSize;
		return value + valueDelta;
	};
	handleHandleMovement = event => {
		if (this.state.isMoving && !this.props.disabled) {
			this._changeValue(this._clientToValue(event.clientX));
		}
	};
	endHandleMovement = event => {
		const { min, max } = this.props;

		this.removeDocumentEventListeners();
		this.setState({ isMoving: false });
		const finalValue = clamp(min, max, this._clientToValue(event.clientX));
		if (this._changeValue) return this._changeValue(finalValue);
	};
	removeDocumentEventListeners = () => {
		document.removeEventListener("mousemove", this.handleHandleMovement);
		document.removeEventListener("mouseup", this.endHandleMovement);
	};
}

export default Handler;
