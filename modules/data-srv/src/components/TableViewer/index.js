import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import parseBsonData from "./parseBsonData";
import renderDataRow from "./renderDataRow";
import { tableActions } from "../../reducer";
import React, { Component, Fragment } from "react";
import renderLoadingState from "./renderLoadingState";
import renderNoSchemaState from "./renderNoSchemaState";
import {
  Layout,
  HTMLTable,
  Text,
  Button,
  Dialog,
  Controls,
  Popover,
  Menu,
  converters
} from "lib";
import {
  assoc,
  toUpper,
  values,
  compose,
  update,
  pathOr,
  path,
  map,
  prop,
  propEq,
  filter,
  length,
  forEach,
  over,
  lensProp
} from "ramda";

const pushRoute = path => window.history.pushState([], "", path);
const toDate = converters.toDate;
const getIdFromArray = (idx, array) => path([idx, "_id"], array);

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.tableName = props.tableName;

    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClearSelectionClick = this.handleClearSelectionClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleDeleteItemsClick = this.handleDeleteItemsClick.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleCloseDetailsClick = this.handleCloseDetailsClick.bind(this);
    this.handleItemsColumnScroll = this.handleItemsColumnScroll.bind(this);

    this.getSchemaAndData();
  }
  componentWillReceiveProps(nextProps) {
    const data = prop(this.tableName, nextProps.store);
    this.schema = values(data.userSchema);
    this.enumerableSchema = values(data.userSchema);
    this.isLoading = data.isLoading;
    this.setState(data);
  }
  render() {
    if (!this.state) return null;

    if (this.isLoading) return <Layout.Row>{renderLoadingState}</Layout.Row>;
    if (this.schema == null)
      return <Layout.Row>{renderNoSchemaState}</Layout.Row>;

    return (
      <Fragment>
        {this.renderMenuRow()}
        {this.renderContentRow()}
      </Fragment>
    );
  }

  renderMenuRow() {
    const tableName = this.tableName;
    const { displayName, items = [] } = this.state;
    const selectedKeys = compose(
      map(prop("_id")),
      filter(propEq("isSelected", true))
    )(items);
    const selectedCount = length(selectedKeys);
    return (
      <Layout.Row key="menu" divider sticky={{ top: 50 }}>
        <Text.Heading size={3}>{toUpper(displayName)}</Text.Heading>
        <Button.Minimal
          icon="plus"
          text="Add Data"
          intent="primary"
          style={{ marginLeft: "auto" }}
          onClick={pushRoute(`/app/data/tables/${tableName}/create`)}
        />
        <Button.Minimal
          text="Refresh"
          icon="refresh"
          intent="primary"
          onClick={this.getSchemaAndData}
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
              onClick={this.handleClearSelectionClick}
            />
            <Dialog.Alert
              target={<Menu.Item icon="trash" text="Delete Items" />}
              message={`Are you sure you want to delete the following items? ${selectedKeys}`}
              onConfirm={() => this.handleDeleteItemsClick(selectedKeys)}
            />
          </Menu>
        </Popover>
      </Layout.Row>
    );
  }
  renderContentRow() {
    return (
      <Layout.Row key="content" height={92}>
        {this.renderItemsColumn()}
        {this.renderDetailsColumn()}
      </Layout.Row>
    );
  }
  renderItemsColumn() {
    const { viewDataId, items = [] } = this.state;
    const filteredSchema = this.enumerableSchema;
    const rowCount = length(items);

    if (viewDataId != null) {
      return (
        <Layout.Column
          divider
          overFlow
          onScroll={this.handleItemsColumnScroll}
          innerRef={this.setItemsColumnRef}
          noPadding
        >
          <HTMLTable.Container
            rowHeight={40}
            rowCount={rowCount}
            onRowClick={this.handleRowClick}
            layoutStyle="fixed"
          >
            <HTMLTable.Column
              width={12}
              key="checkbox-col"
              render={this.renderCheckboxCol(items)}
            />
            <HTMLTable.Column width={12} key="s-no-col" render={i => i + 1} />
            <HTMLTable.Column
              key="name-col"
              render={this.renderCondensedNameCol(items, filteredSchema)}
            />
          </HTMLTable.Container>
        </Layout.Column>
      );
    }

    return (
      <HTMLTable.Container rowCount={rowCount} onRowClick={this.handleRowClick}>
        <HTMLTable.Column
          key="checkbox-col"
          width={40}
          render={this.renderCheckboxCol(items)}
        />
        <HTMLTable.Column
          key="delete-action-col"
          width={40}
          render={this.renderDeleteCol(items)}
        />
        <HTMLTable.Column
          key="s-no-col"
          width={60}
          label="S No"
          render={i => i + 1}
        />
        {map(this.renderSchemaCol(items), filteredSchema)}
        <HTMLTable.Column
          key="created-on-col"
          width={100}
          label="Created On"
          render={i => toDate("DD-MM-YYYY", path([i, "createdAt"], items))}
        />
        <HTMLTable.Column
          key="modified-at-col"
          width={200}
          label="Modified At"
          render={i =>
            toDate("hh:mm A DD-MM-YYYY", path([i, "modifiedAt"], items))
          }
        />
        <HTMLTable.Column
          key="id-col"
          label="Ref #"
          render={i => getIdFromArray(i, items)}
        />
      </HTMLTable.Container>
    );
  }
  renderDetailsColumn() {
    const { viewDataId, items = [] } = this.state;
    if (!viewDataId) return null;

    const tableName = this.tableName;
    const schema = this.schema;
    const itemData = prop(viewDataId, items);
    const id = prop("_id", itemData);
    const renderLayoutRows = scheme => {
      const parsedData = parseBsonData(itemData, scheme);
      return renderDataRow(parsedData, scheme);
    };

    return (
      <Layout.Column width={80} overFlow noPadding>
        <Layout.Row key="full-data-header" divider>
          <Text.Heading size={3} text={`#${id}`} />
          <Button.Minimal
            text="Edit"
            icon="pencil"
            intent="success"
            style={{ marginLeft: "auto" }}
            onClick={pushRoute(`/app/data/tables/${tableName}/${id}`)}
          />
          <Dialog.Alert
            target={
              <Button.Minimal icon="trash" intent="danger" text="Delete" />
            }
            message={`Are you sure you want to delete ${id}`}
            onConfirm={() => this.deleteItemWithId(id)}
          />
          <Button.Minimal icon="times" onClick={this.handleCloseDetailsClick} />
        </Layout.Row>
        {map(renderLayoutRows, schema)}
      </Layout.Column>
    );
  }

  // EVENTS
  handleSelectAllClick() {
    this.setSelectedState(true);
  }
  handleClearSelectionClick() {
    this.setSelectedState(false);
  }
  handleCheckboxClick(id) {
    this.setSelectedState("toggle", id);
  }
  handleDeleteItemsClick(selectedIds) {
    return forEach(this.deleteItemWithId, selectedIds);
  }
  handleRowClick(rowId) {
    this.setViewId(rowId);
  }
  handleCloseDetailsClick() {
    this.setViewId(null);
  }
  handleItemsColumnScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    const { clientHeight, scrollTop, scrollHeight } = event.target;
    const { isLoading = false, paging } = this.state;
    const scrollRatio = Math.floor(
      scrollTop * 100 / (scrollHeight - clientHeight)
    );

    if (scrollRatio === 100 && !isLoading) {
      const { nextKey } = paging;
      if (!nextKey) return;
      return this.getData({ next: nextKey }).then(() => {
        this.itemsColumn.scrollTop = scrollTop;
      });
    }
  }

  // UTILS
  setItemsColumnRef = ref => (this.itemsColumn = ref);
  setViewId = state => this.setState(assoc("viewDataId", state));
  getData = query => this.props.getDataPoints(this.tableName, query);
  getSchemaAndData = () =>
    this.props.getTable(this.tableName).then(this.getData);
  deleteItemWithId = id => {
    this.setViewId(null);
    this.props.deleteDataPoint(this.tableName, id);
  };
  setSelectedState = (switchState, index) => {
    if (switchState === "toggle") {
      const item = prop(index, this.state.items);
      item.isSelected = item.isSelected ? !item.isSelected : true;
      const state = assoc(
        "items",
        update(index, item, this.state.items),
        this.state
      );
      return this.setState(state);
    }
    const setState = over(
      lensProp("items"),
      map(assoc("isSelected", switchState))
    );
    return this.setState(setState);
  };
  renderCondensedNameCol = (items, schema) => idx => {
    const data = prop(idx, items);
    const id = getIdFromArray(idx, items);
    const indexName = parseBsonData(data, schema[0]);

    if (indexName == null)
      return <Text.Heading key="name-heading" intent="primary" text={id} />;
    return (
      <Fragment>
        <Text.Heading key="name-heading" intent="primary" text={indexName} />
        <Text.Small key="data-id" text={id} />
      </Fragment>
    );
  };
  renderCheckboxCol = items => idx => {
    const isSelected = pathOr(false, [idx, "isSelected"], items);
    return (
      <Controls.Checkbox
        value={isSelected}
        onChange={() => this.handleCheckboxClick(idx)}
      />
    );
  };
  renderDeleteCol = items => idx => (
    <Dialog.Alert
      target={<Button.Minimal icon="trash" intent="danger" />}
      message={`Are you sure you want to delete ${path([idx, "_id"], items)}`}
      onConfirm={() => this.deleteItemWithId(getIdFromArray(idx, items))}
    />
  );
  renderSchemaCol = items => schema => {
    const { title, name } = schema;
    return (
      <HTMLTable.Column
        key={`enumerable-${name}-col`}
        label={title}
        render={i => parseBsonData(prop(i, items), schema)}
      />
    );
  };
}

const mapState = state => ({ store: state.data.tables });
const mapDispatch = dispatch =>
  bindActionCreators(
    {
      getTable: tableActions.getTable,
      getDataPoints: tableActions.getDataPoints,
      deleteDataPoint: tableActions.deleteDataPoint
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(TableComponent);
