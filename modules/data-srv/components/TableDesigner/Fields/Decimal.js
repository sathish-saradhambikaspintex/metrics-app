import React, { Fragment } from "react";
import { Controls, Tag } from "lib";
import AbstractField from "../AbstractField";
import AbstractPlaceHolder from "../AbstractPlaceHolder";

class Field extends AbstractField {
	static displayName = "HO.Definition.Field.NumberField";
	renderDisplayTab() {
		const { title, labelPosition, placeholder, description, isArrayType } = this.getFieldData();
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
					<Controls.Label>Place Holder</Controls.Label>
					<Controls.Input type="text" value={placeholder} name="placeholder" onChange={this.handleChange} />
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
		const { defaultValue } = this.getFieldData();
		return (
			<Fragment>
				<Controls.Group>
					<Controls.Label>Default Value</Controls.Label>
					<Controls.Input type="number" value={defaultValue} name="defaultValue" onChange={this.handleChange} />
				</Controls.Group>
			</Fragment>
		);
	}
	renderValidationTab() {
		const {
			required,
			maximum,
			minimum,
			exclusiveMaximum,
			exclusiveMinimum,
			isArrayType,
			maxItems,
			minItems,
			uniqueItems,
		} = this.getFieldData();
		return (
			<Fragment>
				<Controls.Group>
					<Controls.Label>Maximum Value</Controls.Label>
					<Controls.Input type="number" value={maximum} name="maximum" onChange={this.handleChange} />
				</Controls.Group>
				<Controls.Group>
					<Controls.Label>Minimum Value</Controls.Label>
					<Controls.Input type="number" value={minimum} name="minimum" onChange={this.handleChange} />
				</Controls.Group>
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
				<Controls.Checkbox
					value={exclusiveMinimum}
					name="exclusiveMinimum"
					onChange={this.handleChange}
					text="Exclusive Minimum"
				/>
				<Controls.Checkbox
					value={exclusiveMaximum}
					name="exclusiveMaximum"
					onChange={this.handleChange}
					text="Exclusive Maximum"
				/>
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
		const { title, isArrayType, labelPosition, description } = this.getSchema();
		const inputProps = this.getInputProps();

		const labelElement = title ? <Controls.Label text={title} /> : this.renderBlankLabel();
		const inputElement = isArrayType ? (
			<Controls.Input.Multiple type="number" leftElement="0.0" readOnly {...inputProps} />
		) : (
			<Controls.Input type="number" leftElement="0.0" readOnly {...inputProps} />
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

const TagIcon = <Tag.Icon key="decimal-tag" id="decimal" iconText="0.0" text="Decimal" />;

export default { Field, PlaceHolder, TagIcon };
