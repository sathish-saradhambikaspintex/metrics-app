import { connect } from "react-redux";
import { userActions } from "../reducer";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import UserEntryForm from "./UserEntryForm";
import {
  Layout,
  HTMLTable,
  Button,
  Text,
  Controls,
  Popover,
  Menu,
  Dialog,
  filters,
  converters
} from "lib";
import {
  path,
  prop,
  compose,
  filter,
  pathOr,
  length,
  propEq,
  find,
  forEach,
  assoc,
  values,
  lensProp,
  lensPath,
  dissoc,
  over,
  map
} from "ramda";

const toDate = converters.toDate;
const getIsLoading = prop("isLoading");
const setIsSelected = assoc("isSelected", true);
const unsetIsSelected = assoc("isSelected", false);
const getItemsArray = values;
const getItems = compose(
  dissoc("message"),
  dissoc("isLoading"),
  dissoc("currentUser"),
  dissoc("error")
);
const getNames = compose(
  map(prop("username")),
  filter(propEq("isSelected", true)),
  prop("items")
);

class Users extends Component {
  state = { formState: { isOpen: false, username: null }, items: {} };
  isLoading = true;

  constructor(props) {
    super(props);
    props.getUsers();
  }
  componentWillReceiveProps(nextProps) {
    if (getIsLoading(nextProps) !== getIsLoading(this.props)) {
      this.isLoading = nextProps.isLoading;
    }
    this.setState(assoc("items", getItemsArray(nextProps.items)));
  }

  render() {
    const { items } = this.state;
    return (
      <Layout.Container>
        {this.renderMenuRow()}
        <Layout.Row height={92}>
          <Layout.Column width={15} divider>
            {this.renderSearchBar()}
          </Layout.Column>
          <Layout.Column>{this.renderTable(items)}</Layout.Column>
        </Layout.Row>
      </Layout.Container>
    );
  }

  renderMenuRow() {
    const { formState, items } = this.state;
    const { updateUser, addUser } = this.props;
    const selectedKeys = getNames(this.state);
    const selectedCount = length(selectedKeys);
    return (
      <Layout.Row divider sticky={{ top: 50 }}>
        <Button.Minimal
          icon="plus"
          intent="primary"
          text="Add New User"
          style={{ marginLeft: "auto" }}
          onClick={() => this._openForm()}
        />

        {formState.isOpen
          ? UserEntryForm({
              onCloseCb: this._closeForm,
              onSubmitCb: formState.username
                ? data => updateUser(formState.username, data)
                : addUser,
              values: formState.username
                ? find(propEq("username", formState.username), items)
                : {}
            })
          : null}

        <Popover position="bottom-end">
          <Button.Minimal intent="primary" rightIcon="caret-down">
            {selectedCount > 0 ? `${selectedCount} Items Selected` : "Actions"}
          </Button.Minimal>
          <Menu>
            <Menu.Item
              icon="check"
              text="Select All"
              onClick={this._selectAllItems}
            />
            <Menu.Item
              icon="times"
              text="Clear selection"
              onClick={this._deselectAllItems}
            />
            <Menu.Item
              icon="trash"
              text="Delete Items"
              onClick={() => this._deleteItems(selectedKeys)}
              disabled={selectedCount < 1}
            />
          </Menu>
        </Popover>
      </Layout.Row>
    );
  }

  renderSearchBar() {
    return [
      <Controls.Input
        key="search-by-user"
        type="search"
        placeholder="Search By User Name"
        onChange={this.filter("userName")}
      />,
      <Text.Heading key="search-heading" text="General Filters" />,
      <Controls.Group key="search-by-after">
        <Controls.Label text="Created on or after" />
        <Controls.Input
          type="date"
          placeholder="Search By Created After"
          onChange={this.filter("createdAfter")}
        />
      </Controls.Group>,
      <Controls.Group key="search-by-before">
        <Controls.Label text="Created on or before" />
        <Controls.Input
          type="date"
          placeholder="Search By Created Before"
          onChange={this.filter("createdBefore")}
        />
      </Controls.Group>,
      <Controls.Checkbox
        key="search-by-favorite"
        text="Show starred only"
        onChange={this.filter("favorite")}
      />,
      <Controls.Checkbox
        key="search-by-recent"
        text="Show Recents"
        onChange={this.filter("recent")}
      />
    ];
  }

  renderTable(userItems) {
    return (
      <HTMLTable.Container rowCount={length(userItems)}>
        <HTMLTable.Column
          render={this._renderCheckboxCol(userItems)}
          width="40px"
        />
        <HTMLTable.Column
          render={this._renderDeleteCol(userItems)}
          width="40px"
        />
        <HTMLTable.Column
          width="150px"
          label="User Name"
          render={this._renderUserNameCol(userItems)}
        />
        <HTMLTable.Column
          width="200px"
          label="Name"
          render={i => path([i, "name"], userItems)}
        />
        <HTMLTable.Column
          width="200px"
          label="Email ID"
          render={i => path([i, "email"], userItems)}
        />
        <HTMLTable.Column
          width="100px"
          label="Role"
          render={i => path([i, "role"], userItems)}
        />
        <HTMLTable.Column
          width="100px"
          label="Status"
          render={i => path([i, "status"], userItems)}
        />
        <HTMLTable.Column
          width="200px"
          label="Created At"
          render={i =>
            toDate("DD-MM-YY h:mm A", path([i, "createdAt"], userItems))
          }
        />
      </HTMLTable.Container>
    );
  }

  _renderUserNameCol = userItems => i => {
    const username = path([i, "username"], userItems);
    return (
      <div>
        <Button.Minimal
          minimal
          text={username}
          intent="success"
          onClick={e => this._openForm(username)}
        />
      </div>
    );
  };
  _renderCheckboxCol = userItems => i => {
    const isSelected = pathOr(false, [i, "isSelected"], userItems);
    return (
      <Controls.Checkbox
        value={isSelected}
        onChange={({ value }) => this._toggleSelectItem(i, value)}
      />
    );
  };
  _renderDeleteCol = userItems => i => (
    <Dialog.Alert
      target={<Button.Minimal icon="trash" />}
      message={`Are you sure you want to delete ${path(
        [i, "username"],
        userItems
      )}`}
      onClick={() => this.props.deleteUser(path([i, "username"], userItems))}
    />
  );
  _deleteItems(selectedKeys) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete the selected items"
    );
    if (shouldDelete) forEach(this.props.deleteUser, selectedKeys);
  }
  filter = (type, path) => {
    const getFilter = filters(type);
    const originalItems = getItemsArray(this.props.items);
    return value => {
      const filteredItems = filter(getFilter(value), originalItems);
      this.setState(assoc("items", filteredItems));
    };
  };
  _selectAllItems = () => {
    this.setState(over(lensProp("items"), map(setIsSelected)));
  };
  _deselectAllItems = () => {
    this.setState(over(lensProp("items"), map(unsetIsSelected)));
  };
  _toggleSelectItem = (key, value) => {
    this.setState(
      over(lensPath(["items", key]), value ? setIsSelected : unsetIsSelected)
    );
  };
  _openForm = username =>
    this.setState(assoc("formState", { isOpen: true, username }));
  _closeForm = () => this.setState(assoc("formState", { isOpen: false }));
}

const mapState = state => ({
  items: getItems(state.user),
  message: state.user.message,
  isLoading: state.user.isLoading
});
const mapDispatch = dispatch =>
  bindActionCreators(
    {
      getUsers: userActions.getUsers,
      getUser: userActions.getUser,
      updateUser: userActions.updateUser,
      addUser: userActions.addUser,
      deleteUser: userActions.deleteUser
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(Users);
