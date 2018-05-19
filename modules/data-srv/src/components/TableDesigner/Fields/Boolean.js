import React, { Fragment } from "react";
import { Controls, Tag } from "lib";
import AbstractField from "../AbstractField";
import AbstractPlaceHolder from "../AbstractPlaceHolder";

class Field extends AbstractField {
	static displayName = "HO.Definition.Field.BooleanField";
	renderDisplayTab() {
		const { title, labelPosition, placeholder, description } = this.getFieldData();
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
			</Fragment>
		);
	}
	renderDataTab() {
		const { defaultValue } = this.getFieldData();
		return (
			<Fragment>
				<Controls.Group>
					<Controls.Label>Default Value</Controls.Label>
					<Controls.Checkbox value={defaultValue} name="defaultValue" onChange={this.handleChange} />
				</Controls.Group>
			</Fragment>
		);
	}
	renderValidationTab() {
		const { required } = this.getFieldData();
		return (
			<Fragment>
				<Controls.Checkbox value={required} name="required" onChange={this.handleChange} text="Required" />
			</Fragment>
		);
	}
}

class PlaceHolder extends AbstractPlaceHolder {
	renderPlaceHolder() {
		const { title, labelPosition, description } = this.getSchema();
		const inputProps = this.getInputProps();
		const labelElement = title ? <Controls.Label text={title} /> : this.renderBlankLabel();
		const inputElement = <Controls.Checkbox readOnly {...inputProps} />;
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

const TagIcon = <Tag.Icon key="bool-tag" id="bool" iconText="T/F" text="Bool" />;

export default { Field, PlaceHolder, TagIcon };
