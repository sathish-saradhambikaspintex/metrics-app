/* eslint-disable react/display-name */
import React, { Fragment } from "react";
import AbstractField from "../AbstractField";
import AbstractPlaceHolder from "../AbstractPlaceHolder";
import { Controls, Tag, HTMLTable, Text, Button } from "lib";
import { mapObjIndexed, compose, values, length, keys } from "ramda";

const getObjectLength = compose(length, keys);
const mapObjectToArray = compose(values, mapObjIndexed);
const blankItem = { title: "Title", width: 30, bsonType: "text" };
const getElementFromType = bsonType => {
	if (bsonType === "text") return <Controls.Input type="text" readOnly />;
	if (bsonType === "long-text") return <Controls.TextArea readOnly />;
	if (bsonType === "date") return <Controls.Input type="date" readOnly />;
	if (bsonType === "month") return <Controls.Input type="month" readOnly />;
	if (bsonType === "datetime") return <Controls.Input type="datetime-local" readOnly />;
	if (bsonType === "int") return <Controls.Input icon="00" type="number" readOnly />;
	if (bsonType === "double") return <Controls.Input icon="00.." type="number" readOnly />;
	if (bsonType === "decimal") return <Controls.Input icon="0.0" type="number" readOnly />;
	if (bsonType === "bool") return <Controls.Checkbox readOnly />;
	return null;
};
const renderItemDisplayProperties = handleChange => (item, idx) => {
	const { title, width, bsonType } = item;
	const colCount = parseInt(idx, 10) + 1;
	return (
		<Fragment>
			<div style={{ borderBottom: "1px solid rgba(0,0,0,0.6)", marginBottom: 15 }} />
			<Controls.Group.Inline width={40}>
				<Controls.Label>
					Label <small>(Column_{colCount})</small>
				</Controls.Label>
				<Controls.Input type="text" value={title} name={`items.${idx}.title`} onChange={handleChange} />
			</Controls.Group.Inline>
			<Controls.Group.Inline width={40}>
				<Controls.Label>
					Width <small>(Column_{colCount})</small>
				</Controls.Label>
				<Controls.Input type="number" rightIcon="%" value={width} name={`items.${idx}.width`} onChange={handleChange} />
			</Controls.Group.Inline>
			<Controls.Group.Inline width={40}>
				<Controls.Label>
					Type <small>(Column_{colCount})</small>
				</Controls.Label>
				<Controls.Select
					value={bsonType}
					name={`items.${idx}.bsonType`}
					onChange={handleChange}
					items={[
						{ label: "Text", value: "text" },
						{ label: "Long Text", value: "long-text" },
						{ label: "Integer", value: "int" },
						{ label: "Double", value: "double" },
						{ label: "Decimal", value: "decimal" },
						{ label: "Date", value: "date" },
						{ label: "Month", value: "month" },
						{ label: "Date & Time", value: "datetime" },
						{ label: "Bool", value: "bool" },
					]}
				/>
			</Controls.Group.Inline>
		</Fragment>
	);
};
const renderItemDefaultProperties = handleChange => (item, idx) => {
	const { title, defaultValue } = item;
	const colCount = parseInt(idx, 10) + 1;
	return (
		<Fragment>
			<Controls.Group.Inline width={40}>
				<Controls.Label>
					{title} <small>(Column_{colCount})</small>
				</Controls.Label>
				<Controls.Input type="text" value={defaultValue} name={`items.${idx}.defaultValue`} onChange={handleChange} />
			</Controls.Group.Inline>
		</Fragment>
	);
};
const renderColumn = item => {
	const { title, bsonType, width } = item;
	const element = getElementFromType(bsonType);
	return <HTMLTable.Column label={title} width={width} render={() => element} />;
};

class Field extends AbstractField {
	static displayName = "HO.Definition.Field.TableField";
	renderDisplayTab() {
		const { title, description, items } = this.getFieldData();
		return (
			<Fragment>
				<Controls.Group>
					<Controls.Label>Label</Controls.Label>
					<Controls.Input type="text" value={title} name="title" onChange={this.handleChange} />
				</Controls.Group>
				<Controls.Group>
					<Controls.Label>Description</Controls.Label>
					<Controls.TextArea type="text" value={description} name="description" onChange={this.handleChange} />
				</Controls.Group>
				{items && mapObjectToArray(renderItemDisplayProperties(this.handleChange), items)}
				<Button.Minimal
					fill
					icon="plus"
					intent="primary"
					text="Add Column"
					onClick={() =>
						this.handleChange({
							name: "items",
							value: { ...items, [getObjectLength(items)]: blankItem },
						})
					}
				/>
			</Fragment>
		);
	}
	renderDataTab() {
		const { items } = this.getFieldData();
		return items && mapObjectToArray(renderItemDefaultProperties(this.handleChange), items);
	}
	renderValidationTab() {
		const { maxItems, minItems } = this.getFieldData();
		return (
			<Fragment>
				<Controls.Group>
					<Controls.Label>Max no of rows</Controls.Label>
					<Controls.Input type="number" value={maxItems} name="maxItems" onChange={this.handleChange} />
				</Controls.Group>
				<Controls.Group>
					<Controls.Label>Min no of rows</Controls.Label>
					<Controls.Input type="number" value={minItems} name="minItems" onChange={this.handleChange} />
				</Controls.Group>
			</Fragment>
		);
	}
}
class PlaceHolder extends AbstractPlaceHolder {
	renderPlaceHolder() {
		const { title, description, items, minItems } = this.getSchema();
		const labelElement = title ? <Text.Heading size={3} text={title} /> : this.renderBlankLabel();
		const inputElement = items && (
			<HTMLTable.Container rowCount={minItems || 1} border rowHeight={40}>
				{mapObjectToArray(renderColumn, items)}
			</HTMLTable.Container>
		);

		return (
			<Fragment>
				{labelElement}
				<div>
					<small>{description}</small>
				</div>
				{inputElement}
			</Fragment>
		);
	}
}
const TagIcon = <Tag.Icon key="table-tag" id="table" icon="table" text="Table" />;

export default { Field, PlaceHolder, TagIcon };
