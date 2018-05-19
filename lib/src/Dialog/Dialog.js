import ReactDOM from "react-dom";
import React, { PureComponent, Fragment } from "react";
import { assoc, isNil, is, assocPath } from "ramda";

import Button from "../Button";
import Header from "./StyledHeader";
import Content from "./StyledContent";
import Footer from "./StyledFooter";
import Backdrop from "./StyledBackdrop";
import DialogContainer from "./StyledDialogContainer";

class Dialog extends PureComponent {
	static displayName = "HO.Dialog";
	state = { show: false };
	setDialogRef = ref => (this.dialog = ref);
	setFooterRef = ref => (this.footer = ref);

	constructor() {
		super();
		this.handleTargetClick = this.handleTargetClick.bind(this);
		this.handleOnCloseClick = this.handleOnCloseClick.bind(this);
		this.handleOkClick = this.handleOkClick.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	componentWillUnmount() {
		this.setEventListeners(false);
	}
	componentDidUpdate() {
		if (this.state.show) {
			this.setEventListeners(true);
		} else {
			this.setEventListeners(false);
		}
	}
	render() {
		return (
			<Fragment>
				{this.renderTarget()}
				{this.renderDialog()}
			</Fragment>
		);
	}
	renderTarget() {
		const { target } = this.props;
		const targetProps = { onClick: this.handleTargetClick };
		return React.cloneElement(target, targetProps);
	}
	renderDialog() {
		const { children } = this.props;
		const { show } = this.state;
		const count = React.Children.count(children);

		if (count > 3) throw new Error("Count of children cant exceed three elements");
		if (!show) return null;

		const [header, content, footer] = children;
		const newChildren = (
			<Fragment>
				<Backdrop />
				<DialogContainer style={{ zIndex: 40 }} innerRef={this.setDialogRef}>
					{this.renderHeader(header)}
					{this.renderContent(content)}
					{this.renderFooter(footer)}
				</DialogContainer>
			</Fragment>
		);
		return ReactDOM.createPortal(newChildren, document.body);
	}
	renderHeader(node) {
		return (
			<Header>
				{node}
				<Button style={{ marginLeft: "auto" }} tabIndex="-1" onClick={this.handleOnCloseClick} icon="close" />
			</Header>
		);
	}
	renderContent(node) {
		return <Content>{node}</Content>;
	}
	renderFooter(node) {
		const children = is(Array, node) ? node : node.props.children;
		let [cancelBtn, okBtn] = React.Children.toArray(children);

		cancelBtn = assocPath(["props", "onClick"], this.handleOnCloseClick, cancelBtn);
		okBtn = assocPath(["props", "onClick"], this.handleOkClick, okBtn);

		return <Footer innerRef={this.setFooterRef}>{[cancelBtn, okBtn]}</Footer>;
	}

	handleTargetClick() {
		return this.setState(assoc("show", true));
	}
	handleOnCloseClick(event) {
		const { onCancel = () => null } = this.props;
		this.setState(assoc("show", false), () => onCancel(event));
	}
	handleOkClick(event) {
		const { onConfirm = () => null } = this.props;
		this.setState(assoc("show", false), () => onConfirm(event));
	}
	handleOutsideClick(event) {
		const { show } = this.state;
		const isClickInDialog = !isNil(this.dialog) && this.dialog.contains(event.target);

		if (!isClickInDialog && show) {
			this.setState(assoc("show", false));
			event.preventDefault();
			event.stopPropagation();
		}
	}
	handleKeyDown(event) {
		const keyCode = event.keyCode;
		if (keyCode === 27) {
			this.setState(assoc("show", false));
			event.preventDefault();
			event.stopPropagation();
		}
	}

	setEventListeners(shouldSetFlag) {
		if (shouldSetFlag) {
			document.addEventListener("click", this.handleOutsideClick);
			document.addEventListener("keydown", this.handleKeyDown);
		} else {
			document.removeEventListener("click", this.handleOutsideClick);
			document.removeEventListener("keydown", this.handleKeyDown);
		}
	}
}

export default Dialog;
