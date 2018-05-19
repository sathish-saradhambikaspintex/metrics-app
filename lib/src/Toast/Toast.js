import styled from "styled-components";
import React, { Component } from "react";
import { drop, prepend, length, take } from "ramda";
import { INTENTS } from "../_colors";
import Button from "../Button";

const StyledToast = styled.div`
	display: flex;
	align-items: flex-start;
	position: relative !important;
	margin: 15px 0 0;
	border-radius: 3px;
	box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2);
	min-width: 300px;
	max-width: 500px;
	pointer-events: all;
	z-index: 21;
	background: ${({ intent = "default" }) => INTENTS[intent].bgColor};
`;

const ToastMessage = styled.span`
	color: ${({ intent = "default" }) => INTENTS[intent].color};
	flex: 1 1 auto;
	padding: 11px;
`;

const toastButtonGroupStyle = {
	flex: "0 0 auto",
	padding: 5,
	paddingLeft: 0,
};

class Toast extends Component {
	static displayName = "HO.Toast";

	static defaultProps = {
		timeout: 3000,
	};

	timeoutIndex = 0;
	timeoutIds = [];

	render() {
		const { intent, action, children } = this.props;
		return (
			<StyledToast
				intent={intent}
				onFocus={this.endTimeout}
				onBlur={this.startTimeout}
				onMouseLeave={this.startTimeout}
				onMouseEnter={this.endTimeout}
			>
				<ToastMessage intent={intent}>{children}</ToastMessage>
				{action ? (
					<Button.Group intent={intent} style={toastButtonGroupStyle} minimal>
						{action}
						<Button.Minimal icon="times" onClick={() => this.triggerDismiss(false)} />
					</Button.Group>
				) : (
					<Button.Minimal icon="times" onClick={() => this.triggerDismiss(false)} />
				)}
			</StyledToast>
		);
	}

	componentDidMount() {
		this.startTimeout();
	}

	componentWillUnmount() {
		this.endTimeout();
	}

	startTimeout = () => {
		if (this.props.timeout > 0) {
			const setTimeoutHandler = setTimeout(() => this.triggerDismiss(true), this.props.timeout);
			this.timeoutIds = prepend(setTimeoutHandler, this.timeoutIds);
		}
	};

	endTimeout = () => {
		if (length(this.timeoutIds) > 0) {
			clearTimeout(take(1, this.timeoutIds));
			this.timeoutIds = drop(1, this.timeoutIds);
		}
		this.timeoutIds = [];
	};

	triggerDismiss = didTimeoutExpire => {
		if (this.props.onDismiss) this.props.onDismiss(didTimeoutExpire);
	};
}

export default Toast;
