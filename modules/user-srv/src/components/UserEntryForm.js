import React, { Component, Fragment } from "react";
import {
  assoc,
  assocPath,
  isNil,
  isEmpty,
  either,
  compose,
  head,
  last,
  split
} from "ramda";
import { Button, Controls, Dialog } from "lib";

const isEmptyOrNil = either(isEmpty, isNil);

class UserEntryForm extends Component {
  formValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    role: {},
    phoneNumber: "",
    password: ""
  };
  setFormRef = ref => (this.form = ref);

  constructor(props) {
    super(props);
    if (isEmptyOrNil(props.values)) {
      this.state = { values: this.formValues, isOpen: true };
    } else {
      const { name, username, email, role, phoneNumber } = props.values;
      const firstName = compose(head, split(" "))(name);
      const lastName = compose(last, split(" "))(name);
      const values = compose(
        assoc("firstName", firstName),
        assoc("lastName", lastName)
      )({
        username,
        email,
        role,
        phoneNumber
      });
      this.state = { values, isOpen: true };
    }
  }

  render() {
    const { isOpen, values } = this.state;
    const {
      username,
      firstName,
      lastName,
      email,
      role,
      password,
      phoneNumber
    } = values;
    const isInEditMode = !isEmptyOrNil(this.props.values);
    const roleOptions = [
      {
        label: "Super Admin",
        value: "superAdmin"
      },
      {
        label: "Admin",
        value: "admin"
      },
      {
        label: "Manager",
        value: "manager"
      },
      {
        label: "Technician",
        value: "technician"
      }
    ];

    return (
      <Dialog
        isOpen={isOpen}
        onClose={this._onClose}
        target={<Button text="O" />}
      >
        <Fragment>
          {isInEditMode ? "Update User Profile" : "Add User Profile"}
        </Fragment>
        <Fragment>
          <Controls.Group>
            <Controls.Label text="Enter Username" />
            <Controls.Input
              type="text"
              name="username"
              value={username}
              readOnly={isInEditMode}
              placeholder="User Name"
              onChange={this.handleInputChange}
            />
          </Controls.Group>
          <Controls.Group>
            <Controls.Label text="Enter First Name" />
            <Controls.Input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="First Name"
              onChange={this.handleInputChange}
            />
          </Controls.Group>
          <Controls.Group>
            <Controls.Label text="Enter Last Name" />
            <Controls.Input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              onChange={this.handleInputChange}
            />
          </Controls.Group>
          <Controls.Group>
            <Controls.Label text="Enter EmailID" />
            <Controls.Input
              type="email"
              name="email"
              value={email}
              placeholder="EmailID"
              onChange={this.handleInputChange}
            />
          </Controls.Group>
          <Controls.Group>
            <Controls.Label text="Enter user's phone number" />
            <Controls.Input
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Phone number"
              onChange={this.handleInputChange}
            />
          </Controls.Group>
          <Controls.Group>
            <Controls.Label text="Select the user access" />
            <Controls.Select
              fill
              name="role"
              value={role}
              options={roleOptions}
              onChange={this.handleInputChange}
            />
          </Controls.Group>
          {!isInEditMode && (
            <Controls.Group>
              <Controls.Label text="Enter password" />
              <Controls.Input
                type="password"
                name="password"
                value={password}
                placeholder="Enter a strong password"
                onChange={this.handleInputChange}
              />
            </Controls.Group>
          )}
        </Fragment>
        <Fragment>
          <Button icon="times" onClick={this._resetForm} text="Cancel" />
          <Button
            type="submit"
            icon="floppy-o"
            intent={isInEditMode ? "primary" : "success"}
            text={isInEditMode ? "Update" : "Add User"}
          />
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

  handleInputChange = ({ name, value }) =>
    this.setState(assocPath(["values", name], value));
}

export default ({ values, onSubmitCb, onCloseCb }) => (
  <UserEntryForm values={values} onSubmit={onSubmitCb} onClose={onCloseCb} />
);
