/* eslint-disable react/display-name */
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { bookActions } from "../reducer";
import { bindActionCreators } from "redux";
import {
  compose,
  length,
  path,
  pathOr,
  assoc,
  values,
  lensProp,
  update,
  over,
  filter,
  prop,
  dissoc,
  propEq,
  forEach,
  map
} from "ramda";
import {
  Menu,
  NonIdealState,
  Progress,
  Text,
  Controls,
  Popover,
  Button,
  Layout,
  HTMLTable,
  filters,
  converters
} from "lib";

const pushRoute = path => window.history.pushState([], "", path);
const toDate = converters.toDate;
const getIsLoading = prop("isLoading");
const getItemsArray = values;
const filterItems = compose(
  dissoc("isLoading"),
  dissoc("error"),
  dissoc("message")
);
const getNames = compose(
  map(prop("name")),
  filter(propEq("isSelected", true)),
  prop("items")
);

class ListBooks extends Component {
  state = { items: {} };
  isLoading = true;
  filter = type => {
    const getFilter = filters(type);
    const originalItems = getItemsArray(this.props.items);
    return ({ value }) => {
      const filteredItems = filter(getFilter(value), originalItems);
      this.setState(assoc("items", filteredItems));
    };
  };
  setSelectedState = (switchState, index) => {
    if (switchState === "toggle") {
      const item = path(["items", index], this.state);
      item.isSelected = item.isSelected ? !item.isSelected : true;
      const state = update(index, item, this.state.items);
      return this.setState(state);
    }
    const setState = over(
      lensProp("items"),
      map(assoc("isSelected", switchState))
    );
    return this.setState(setState);
  };
  renderWorkbookNameCol = items => i => {
    const displayname = path([i, "displayName"], items);
    const name = path([i, "name"], items);
    return (
      <div style={{ display: "flex" }}>
        {displayname}
        <Button.Minimal
          intent="success"
          icon="pencil-square-o"
          style={{ marginLeft: "auto" }}
          onClick={() => this._openWorkbookForm(name)}
        />
      </div>
    );
  };
  renderCheckboxCol = items => i => {
    const isSelected = pathOr(false, [i, "isSelected"], items);
    return <Controls.Checkbox value={isSelected} />;
  };
  renderDeleteCol = items => i => {
    const key = path([i, "name"], items);
    return (
      <Button.Minimal icon="trash" id={key} onClick={this.handleTableDelete} />
    );
  };

  constructor(props) {
    super(props);
    props.getBooks();
  }
  componentWillReceiveProps(nextProps) {
    if (getIsLoading(nextProps) !== getIsLoading(this.props)) {
      this.isLoading = nextProps.isLoading;
    }
    this.setState(assoc("items", getItemsArray(nextProps.items)));
  }
  render() {
    if (this.isLoading)
      return (
        <NonIdealState visual={<Progress />} title="Data is loading...." />
      );
    return (
      <Fragment>
        {this.renderMenuRow()}
        {this.renderContentRow()}
      </Fragment>
    );
  }

  renderMenuRow() {
    const selectedKeys = getNames(this.state);
    const selectedCount = length(selectedKeys);
    return (
      <Layout.Row divider sticky={{ top: 50 }}>
        <Button.Minimal
          minimal
          text="Tables"
          onClick={pushRoute("/app/data/tables")}
        />
        <Button.Minimal
          minimal
          text="Books"
          onClick={pushRoute("/app/data/books")}
        />
        <Button.Minimal
          icon="plus"
          intent="primary"
          text="Create new Workbook"
          style={{ marginLeft: "auto" }}
          onClick={() => this._openWorkbookForm()}
        />
        <Popover position="bottom-end">
          <Button.Minimal
            intent="primary"
            rightIcon="caret-down"
            text={
              selectedCount > 0 ? `${selectedCount} Items Selected` : "Actions"
            }
          />
          <Menu>
            <Menu.Item
              icon="check"
              onClick={this._selectAllItems}
              text="Select All"
            />
            <Menu.Item
              icon="times"
              text="Clear selection"
              onClick={this._deselectAllItems}
            />
            <Menu.Item
              icon="trash"
              text="Delete Items"
              disabled={selectedCount < 1}
              onClick={this.handleTableDelete}
            />
          </Menu>
        </Popover>
      </Layout.Row>
    );
  }
  renderContentRow() {
    return (
      <Layout.Row height={93.5} key="content">
        {this.renderSearchColumn()}
        {this.renderListColumn()}
      </Layout.Row>
    );
  }
  renderSearchColumn() {
    return (
      <Layout.Column width={15} divider>
        <Controls.Input
          key="search-by-book"
          type="text"
          placeholder="Search By Workbook"
          onChange={this.filter("name")}
        />
        <Text.Heading size={3} key="search-heading" text="General Filters" />
        <Controls.Group key="search-by-after">
          <Controls.Label text="Created on or after" />
          <Controls.Input
            type="date"
            placeholder="Search..."
            onChange={this.filter("createdAfter")}
          />
        </Controls.Group>
        <Controls.Group key="search-by-before">
          <Controls.Label text="Created on or before" />
          <Controls.Input
            type="date"
            placeholder="Search..."
            onChange={this.filter("createdBefore")}
          />
        </Controls.Group>
        <Controls.Checkbox
          key="search-by-favorite"
          text="Show starred only"
          onChange={this.filter("favorite")}
        />
      </Layout.Column>
    );
  }
  renderListColumn() {
    const { items } = this.state;
    return (
      <Layout.Column overFlow onRowClick={this.handleRowClick}>
        <HTMLTable.Container rowCount={length(items)}>
          <HTMLTable.Column render={this.renderCheckboxCol(items)} width={5} />
          <HTMLTable.Column render={this.renderDeleteCol(items)} width={5} />
          <HTMLTable.Column
            label="Workbook"
            width={25}
            render={this.renderWorkbookNameCol(items)}
          />
          <HTMLTable.Column
            width={25}
            label="Role"
            render={i => path([i, "role"], items)}
          />
          <HTMLTable.Column
            width={20}
            label="Created By"
            render={i => path([i, "createdBy", "username"], items)}
          />
          <HTMLTable.Column
            width={20}
            label="Created On"
            render={i => toDate("DD-MM-YYYY", path([i, "createdAt"], items))}
          />
        </HTMLTable.Container>
      </Layout.Column>
    );
  }

  // EVENTS
  handleSelectAllClick() {
    this.setSelectedState(true);
  }
  handleDeSelectAllClick() {
    this.setSelectedState(false);
  }
  handleRowClick(id) {
    this.setSelectedState("toggle", id);
  }
  handleTableDelete(event) {
    const id = event.target.id;
    if (id) {
      let shouldDelete = window.confirm(
        `Are you sure you want to delete the table ${id}`
      );
      if (shouldDelete) this.props.deleteWorkbook(id);
    } else {
      const selectedKeys = getNames(this.state);
      let shouldDelete = window.confirm(
        "Are you sure you want to delete the selected items"
      );
      if (shouldDelete) forEach(this.props.deleteWorkbook, selectedKeys);
    }
  }
}

const mapStateToProps = state => {
  const store = state.data.books;
  return {
    items: filterItems(store),
    isLoading: store.isLoading,
    message: store.message
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBooks: bookActions.getBooks,
      addWorkbook: bookActions.addWorkbook,
      updateWorkbook: bookActions.updateWorkbook,
      deleteWorkbook: bookActions.deleteWorkbook
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ListBooks);
