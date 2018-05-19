import React, { PureComponent } from "react";
import { assoc, pickAll, prop, propOr } from "ramda";
import { Button } from "lib";
import StyledLabelPlaceholder from "./StyledLabelPlaceholder";

class AbstractPlaceHolder extends PureComponent {
	// HELPERS
	setHover = () => this.setState(assoc("isHovered", true));
	unsetHover = () => this.setState(assoc("isHovered", false));
	getSchema = () => this.props.schema;
	getInputProps = () => pickAll(["value", "placeholder"], this.props.schema);
	getLabelProps = () => pickAll(["title", "required"], this.props.schema);
	getLabelPosition = () => propOr(false, "titlePosition", this.props.schema);
	getDescription = () => prop("description", this.props.schema);

	constructor(props) {
		super(props);
		this.state = { isHovered: false, width: `${props.containerWidth}px` };

		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleResizeClick = this.handleResizeClick.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}
	render() {
		const { isHovered, width } = this.state;
		const { isCurrent, schema, containerWidth, onEdit, onDelete, ...others } = this.props;
		const style = {
			padding: 10,
			marginBottom: 5,
			minHeight: 120,
			flex: `0 0 ${width}`,
			maxWidth: width,
			position: "relative",
			boxSizing: "border-box",
			border: isHovered ? "1px solid" : "1px solid rgba(0,0,0,0)",
			background: isHovered || isCurrent ? "rgba(0,0,0,0.05)" : undefined,
		};

		return (
			<div {...others} style={style} onMouseEnter={this.setHover} onMouseLeave={this.unsetHover}>
				{this.renderPlaceHolder()}
				{this.renderButtonGroup()}
				{this.renderResizeGroup()}
			</div>
		);
	}
	renderButtonGroup() {
		const { isHovered } = this.state;
		if (!isHovered) return null;
		return (
			<Button.Group style={{ position: "absolute", right: 10, bottom: 10 }}>
				<Button icon="pencil" onClick={this.handleEditClick} />
				<Button icon="trash" onClick={this.handleDeleteClick} />
			</Button.Group>
		);
	}
	renderResizeGroup() {
		const { isHovered, width } = this.state;
		const { containerWidth } = this.props;
		if (isHovered) {
			return (
				<Button.Group style={{ position: "absolute", top: 10, right: 10 }}>
					<Button value={100} text="1" onClick={this.handleResizeClick} />
					<Button value={67} text="2/3" onClick={this.handleResizeClick} />
					<Button value={33} text="1/3" onClick={this.handleResizeClick} />
				</Button.Group>
			);
		}

		const percentWidth = Math.round(parseInt(width, 10) * 100 / containerWidth);
		return <div style={{ position: "absolute", top: 5, right: 5 }}>{percentWidth} %</div>;
	}
	renderBlankLabel() {
		return <StyledLabelPlaceholder />;
	}

	// EVENTS
	handleEditClick(event) {
		const { onEdit, id } = this.props;
		if (onEdit) {
			event.stopPropagation();
			onEdit(id);
		}
	}
	handleDeleteClick(event) {
		const { onDelete, id } = this.props;
		if (onDelete) {
			event.stopPropagation();
			onDelete(id);
		}
	}
	handleDragStart(event) {
		event.dataTransfer.setData("text/plain", event.target.id);
	}
	handleResizeClick(event) {
		const { containerWidth, onChange, id } = this.props;
		const { value } = event.target;
		const width = containerWidth * value / 100;
		if (onChange) onChange({ id, name: "width", value });
		this.setState(assoc("width", `${width}px`));
	}
}

export default AbstractPlaceHolder;
