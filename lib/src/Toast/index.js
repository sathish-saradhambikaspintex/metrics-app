import ReactDOM from "react-dom";
import React, { Component } from "react";
import { append, remove, update, forEach } from "ramda";
import Toast from "./Toast";
import * as KEYS from "../_keys";
import * as VARS from "../_variables";

class Toaster extends Component {
	static displayName = "HO.Toaster";

	static defaultProps = {
		position: "top",
		canEscapeKeyClear: true,
	};

	toastId = 0;

	constructor() {
		super();
		this.state = { toasts: [] };
	}

	render() {
		const { canEscapeKeyClear, position } = this.props;
		const toastStyle = {
			position: "fixed",
			right: 0,
			left: 0,
			zIndex: VARS.zIndexOverlay,
			padding: "0 15px 15px",
			pointerEvents: "none",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		};

		if (position === "top") toastStyle.top = 0;
		if (position === "bottom") toastStyle.bottom = 0;
		return null;
	}

	renderToast = ({ intent, action, children, key }) => {
		return (
			<Toast action={action} intent={intent} onDismiss={this.dismiss(key)}>
				{children}
			</Toast>
		);
	};

	static create = (props, container = document.body) => {
		const containerElement = document.createElement("div");
		container.appendChild(containerElement);
		return ReactDOM.render(<Toaster {...props} />, containerElement);
	};

	show = props => {
		const options = this.createToastOptions(props);
		this.setState(prevState => ({ toasts: append(options, prevState.toasts) }));
		return options.key;
	};

	update = (key, props) => {
		const options = this.createToastOptions(props, key);
		this.setState(prevState => ({ toasts: update(key, options, prevState.toasts) }));
	};

	dismiss = key => () => {
		this.setState(prevState => ({ toasts: remove(key, 1, prevState.toasts) }));
	};

	clear = () => {
		forEach(toast => toast.onDismiss && toast.onDismiss(false), this.state.toasts);
		this.setState({ toasts: [] });
	};

	get = () => this.state.toasts;

	createToastOptions = (props, key = `toast-${this.toastId++}`) => ({
		...props,
		key,
		timeOut: 5000,
	});

	handleClose = e => {
		const { canEscapeKeyClear } = this.props;
		if (e.which === KEYS.ESCAPE && canEscapeKeyClear) {
			e.preventDefault();
			this.clear();
		}
	};
}

export default Toaster;
