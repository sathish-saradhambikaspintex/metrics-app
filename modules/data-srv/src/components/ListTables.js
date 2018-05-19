/* eslint-disable react/display-name */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Fragment, Component } from "react";
import { tableActions, bookActions } from "../reducer";
import {
  compose,
  length,
  path,
  pathOr,
  update,
  assoc,
  values,
  lensProp,
  over,
  filter,
  prop,
  dissoc,
  propEq,
  forEach,
  map
} from "ramda";
import {
  Button,
  Menu,
  NonIdealState,
  Progress,
  Text,
  Controls,
  Popover,
  Layout,
  HTMLTable,
  filters,
  converters
} from "lib";

const pushRoute = path => window.history.pushState([], "", path);
const getItemsArray = values;
const toDate = converters.toDate;
const getIsLoading = prop("isLoading");
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

class ListTables extends Component {
  state = { items: {} };
  isLoading = true;
  filter = type => {
    const getFilter = filters(type);
    const originalItems = getItemsArray(this.props.items);
    return value => {
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
  renderTemplateNameCol = items => i => {
    const displayName = path([i, "displayName"], items);
    const name = path([i, "name"], items);
    return (
      <Button.Group>
        <Button.Minimal
          intent="success"
          text={displayName}
          onClick={pushRoute(`/app/data/tables/${name}`)}
        />
        <Button.Minimal
          icon="pencil-square-o"
          onClick={pushRoute(`/app/data/designer/${name}`)}
        />
      </Button.Group>
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

    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleDeSelectAllClick = this.handleDeSelectAllClick.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleTableDelete = this.handleTableDelete.bind(this);

    props.getTables();
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
      <Layout.Row key="menu" divider sticky={{ top: 50 }}>
        <Button.Minimal
          minimal
          onClick={pushRoute("/app/data/tables")}
          text="Tables"
        />
        <Button.Minimal
          minimal
          onClick={pushRoute("/app/data/books")}
          text="Books"
        />
        <Button.Minimal
          icon="plus"
          intent="primary"
          text="Add New Template"
          style={{ marginLeft: "auto" }}
          onClick={pushRoute("/app/data/designer")}
        />
        <Popover position="bottom-end">
          <Button.Minimal intent="primary" rightIcon="caret-down">
            {selectedCount > 0
              ? `${selectedCount} Item(s) Selected`
              : "Actions"}
          </Button.Minimal>
          <Menu>
            <Menu.Item
              icon="check"
              onClick={this.handleSelectAllClick}
              text="Select All"
            />
            <Menu.Item
              icon="times"
              text="Clear selection"
              onClick={this.handleDeSelectAllClick}
            />
            <Menu.Item
              icon="trash"
              text="Delete Items"
              onClick={this.handleTableDelete}
              disabled={selectedCount < 1}
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
          key="search-by-table"
          type="search"
          placeholder="Search By Table Name"
          onChange={this.filter("name")}
        />
        <Text.Heading size={3} key="search-heading" text="General Filters" />
        <Controls.Group key="search-by-book">
          <Controls.Label text="Belongs to workbook" />
          <Controls.Input
            type="text"
            placeholder="Search By Workbook"
            onChange={this.filter("workbook")}
          />
        </Controls.Group>
        <Controls.Group key="search-by-after">
          <Controls.Label text="Created on or after" />
          <Controls.Input type="date" onChange={this.filter("createdAfter")} />
        </Controls.Group>
        <Controls.Group key="search-by-before">
          <Controls.Label text="Created on or before" />
          <Controls.Input type="date" onChange={this.filter("createdBefore")} />
        </Controls.Group>
        <Controls.Checkbox
          key="search-by-favorite"
          text="Show starred only"
          onChange={this.filter("favorite")}
        />
        <Controls.Checkbox
          key="search-by-recent"
          text="Show Recents"
          onChange={this.filter("recent")}
        />
      </Layout.Column>
    );
  }
  renderListColumn() {
    const { items } = this.state;
    return (
      <Layout.Column overFlow>
        <HTMLTable.Container
          rowCount={length(items)}
          onRowClick={this.handleRowClick}
          layoutStyle="fixed"
        >
          <HTMLTable.Column width={5} render={this.renderCheckboxCol(items)} />
          <HTMLTable.Column width={5} render={this.renderDeleteCol(items)} />
          <HTMLTable.Column
            label="Template Name"
            render={this.renderTemplateNameCol(items)}
            width={20}
          />
          <HTMLTable.Column
            label="Creator"
            width={15}
            render={i => path([i, "createdBy"], items)}
          />
          <HTMLTable.Column
            width={40}
            label="Belongs to workbook"
            render={i => path([i, "workbook", "label"], items)}
          />
          <HTMLTable.Column
            width={15}
            label="Modified At"
            render={i =>
              compose(toDate("DD-MM-YY h:mm A"), path([i, "modifiedAt"]))(items)
            }
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
      if (shouldDelete) this.props.deleteTable(id);
    } else {
      const selectedKeys = getNames(this.state);
      let shouldDelete = window.confirm(
        "Are you sure you want to delete the selected items"
      );
      if (shouldDelete) forEach(this.props.deleteTable, selectedKeys);
    }
  }
}

const mapStateToProps = state => {
  const store = state.data.tables;
  return {
    items: filterItems(store),
    isLoading: store.isLoading,
    message: store.message
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addWorkbook: bookActions.addWorkbook,
      getTables: tableActions.getTables,
      deleteTable: tableActions.deleteTable
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ListTables);
