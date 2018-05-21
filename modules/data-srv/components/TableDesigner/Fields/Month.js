import React, { Fragment } from "react";
import { Controls, Tag } from "lib";
import AbstractField from "../AbstractField";
import AbstractPlaceHolder from "../AbstractPlaceHolder";

class Field extends AbstractField {
	static displayName = "HO.Definition.Field.DateField";
	renderDisplayTab() {
		const { title, labelPosition, description, isArrayType } = this.getFieldData();
		return (
			<Fragment>
				<Controls.Group>
					<Controls.Label>Label</Controls.Label>
					<Controls.Input type="text" value={title} name="title" onChange={this.handleChange} />
				</Controls.Group>
				<Controls.Group>
					<Controls.Label>Label Position</Controls.Label>
					<Controls.Radio.Group
						value={labelPosition}
						name="labelPosition"
						onChange={this.handleChange}
						items={[{ label: "Stacked", value: "stacked" }, { label: "Inline", value: "inline" }]}
					/>
				</Controls.Group>
				<Controls.Group>
					<Controls.Label>Description</Controls.Label>
					<Controls.TextArea type="text" value={description} name="description" onChange={this.handleChange} />
				</Controls.Group>
				<Controls.Checkbox value={isArrayType} name="isArrayType" onChange={this.handleChange} text="Is Array" />
			</Fragment>
		);
	}
	renderDataTab() {
		const { defaultValue, altType } = this.getFieldData();
		return (
			<Fragment>
				<Controls.Group>
					<Controls.Label>Default Value</Controls.Label>
					<Controls.Input type={altType} value={defaultValue} name="defaultValue" onChange={this.handleChange} />
				</Controls.Group>
			</Fragment>
		);
	}
	renderValidationTab() {
		const { required, maxItems, minItems, uniqueItems, isArrayType } = this.getFieldData();
		return (
			<Fragment>
				{isArrayType && (
					<Controls.Group>
						<Controls.Label>Max Items</Controls.Label>
						<Controls.Input type="number" value={maxItems} name="maxItems" onChange={this.handleChange} />
					</Controls.Group>
				)}
				{isArrayType && (
					<Controls.Group>
						<Controls.Label>Min Items</Controls.Label>
						<Controls.Input type="number" value={minItems} name="minItems" onChange={this.handleChange} />
					</Controls.Group>
				)}
				<Controls.Checkbox value={required} name="required" onChange={this.handleChange} text="Required" />
				{isArrayType && (
					<Controls.Checkbox
						value={uniqueItems}
						name="uniqueItems"
						onChange={this.handleChange}
						text="Are items unique"
					/>
				)}
			</Fragment>
		);
	}
}

class PlaceHolder extends AbstractPlaceHolder {
	renderPlaceHolder() {
		const { title, labelPosition, description, isArrayType } = this.getSchema();
		const inputProps = this.getInputProps();
		const labelElement = title ? <Controls.Label text={title} /> : this.renderBlankLabel();
		const inputElement = isArrayType ? (
			<Controls.Input.Multiple type="month" readOnly {...inputProps} />
		) : (
			<Controls.Input type="month" readOnly {...inputProps} />
		);
		const GroupElement = labelPosition === "stacked" ? Controls.Group : Controls.Group.Inline;

		return (
			<GroupElement>
				{labelElement}
				{inputElement}
				<small>{description}</small>
			</GroupElement>
		);
	}
}

const TagIcon = <Tag.Icon key="month-tag" id="month" iconText="MM/YY" text="Month" />;

export default { Field, PlaceHolder, TagIcon };
