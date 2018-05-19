import React, { Component, Fragment } from "react";
import { assoc, assocPath, isNil, isEmpty, either } from "ramda";
import { Button, Controls, Dialog, Group } from "lib";

const isEmptyOrNil = either(isEmpty, isNil);
class WorkbookForm extends Component {
	formValues = {
		name: "",
		role: {},
	};
	constructor(props) {
		super(props);
		if (isEmptyOrNil(props.values)) {
			this.state = { values: this.formValues, isOpen: true };
		} else {
			const { name, role } = props.values;
			const values = { name, role };
			this.state = { values: values, isOpen: true };
		}
	}

	_setFormRef = ref => (this.form = ref);

	render() {
		const { isOpen, values } = this.state;
		const { name, role } = values;
		const isInEditMode = !isEmptyOrNil(this.props.values);
		const roleOptions = [
			{
				label: "Super Admin",
				value: "superAdmin",
			},
			{
				label: "Admin",
				value: "admin",
			},
			{
				label: "Manager",
				value: "manager",
			},
			{
				label: "Technician",
				value: "technician",
			},
		];

		return (
			<Dialog isOpen={isOpen} onClose={this._onClose} target={<Button text="O" />}>
				{isInEditMode ? "Update Workbook" : "Create New Workbook"}
				<Fragment>
					<Group>
						<Controls.Label text="Enter the name of the workbook/collection" />
						<Controls.Input
							type="text"
							name="name"
							value={name}
							onChange={this.handleInputChange}
							placeholder="WorkBook Name"
						/>
					</Group>
					<Group>
						<Controls.Label text="Select the users who will have access to the workbook/collection" />
						<Controls.Select fill name="role" value={role} onChange={this.handleInputChange} options={roleOptions} />
					</Group>
				</Fragment>
				<Fragment>
					<Button icon="times" onClick={this._onClose} text="Cancel" />
					<Button icon="floppy-o" intent="success" type="submit" text="Save" />
				</Fragment>
			</Dialog>
		);
	}

	_onSubmit = e => {
		e.preventDefault();
		const formData = this.state.values;
		this.props.onSubmit(formData);
		this._onClose(e);
	};

	_resetForm = e => {
		e.preventDefault();
		this.form.reset();
		this._onClose(e);
	};

	_onClose = e => {
		e.preventDefault();
		this.setState(assoc("isOpen", false));
		this.props.onClose();
	};
	handleInputChange = ({ name, value }) => this.setState(assocPath(["values", name], value));
}

/* eslint-disable */
export default ({ values, onSubmitCb, onCloseCb }) => (
	<WorkbookForm values={values} onSubmit={onSubmitCb} onClose={onCloseCb} />
);
