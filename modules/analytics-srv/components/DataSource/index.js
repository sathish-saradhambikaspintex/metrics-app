import joinInner from "./innerJoin";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataSourceActions } from "../../reducer";
import previewTableRender from "./previewTableRender";
import React, { Component, Fragment } from "react";
import { filterItems, getIsLoading } from "./utils";
import {
  Button,
  Menu,
  Popover,
  Layout,
  NonIdealState,
  Progress,
  Controls,
  Text,
  Tag
} from "lib";
import {
  compose,
  values,
  without,
  append,
  prop,
  map,
  isEmpty,
  length,
  propOr,
  over,
  lensProp,
  union
} from "ramda";

const pushRoute = path => window.history.pushState([], "", path);
class DataSource extends Component {
  isLoading = true;
  sources = [];
  state = {
    items: [],
    baseTableNames: [],
    joinTableNames: []
  };

  // HELPERS
  getDataSources = this.props.getDataSources;
  getDataSource = this.props.getDataSource;
  getItems = name => compose(propOr([], "items"), prop(name))(this.props.store);
  getUserSchema = name =>
    compose(propOr([], "userSchema"), prop(name))(this.props.store);
  setBaseTableNames = name =>
    this.setState(over(lensProp("baseTableNames"), () => [name]));
  removeBaseTableNames = () =>
    this.setState(over(lensProp("baseTableNames"), () => []));
  setJoinTableNames = name =>
    this.setState(over(lensProp("joinTableNames"), append(name)));
  removeJoinTableNames = name =>
    this.setState(over(lensProp("joinTableNames"), without([name])));

  constructor(props) {
    super(props);
    this.getDataSources();

    this.handleTagClick = this.handleTagClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (getIsLoading(nextProps) !== getIsLoading(this.props)) {
      this.isLoading = nextProps.isLoading;
    }
    this.sources = values(nextProps.store);
  }

  render() {
    if (this.isLoading)
      return <Layout.Row>{this.renderLoadingState()}</Layout.Row>;

    return (
      <Fragment>
        {this.renderMenuRow()}
        <Layout.Row height={92} key="content">
          {this.renderTableTagsColumn()}
          {this.renderWorkspaceColumn()}
        </Layout.Row>
      </Fragment>
    );
  }
  renderLoadingState() {
    return <NonIdealState visual={<Progress />} title="Data is loading...." />;
  }
  renderMenuRow() {
    return (
      <Layout.Row key="menu" divider sticky={{ top: 50 }}>
        <Button.Minimal
          minimal
          onClick={pushRoute("/app/analytics/dataSource")}
          text="Data Source"
        />
        <Button.Minimal
          minimal
          onClick={pushRoute("/app/analytics/sheets")}
          text="Sheets"
        />
        <Button.Minimal
          minimal
          onClick={pushRoute("/app/analytics/dashboard")}
          text="Dashboards"
        />
        <Button.Minimal
          icon="plus"
          intent="primary"
          text="Add New DataSource"
          style={{ marginLeft: "auto" }}
          onClick={pushRoute("/app/analytics/dataSource")}
        />
        <Popover position="bottom-end">
          <Button.Minimal intent="primary" rightIcon="caret-down">
            {"Actions"}
          </Button.Minimal>
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
            <Menu.Item icon="trash" text="Remove DataSource" onClick={""} />
          </Menu>
        </Popover>
      </Layout.Row>
    );
  }
  renderDataSourcesOptions() {
    return (
      <Fragment>
        <Button.Minimal icon="table" title="Table View" />
        <Button.Minimal icon="list" title="List View" />
        <Controls.Input type="number" title="Listed Number Of Rows" />
        <Text.Heading size={6} text="rows" />
      </Fragment>
    );
  }
  renderTableTagsColumn() {
    const transform = ({ name, displayName }) => ({
      large: true,
      text: displayName,
      onClick: () => this.handleTagClick(name)
    });
    const tablesTags = map(compose(Tag, transform), this.sources);
    return (
      <Layout.Column width={15} divider overFlow>
        {tablesTags}
      </Layout.Column>
    );
  }
  renderWorkspaceColumn() {
    return (
      <Layout.Column overFlow>
        {this.renderJoinArea()}
        {this.renderMenu()}
        {this.renderTablePreview()}
      </Layout.Column>
    );
  }
  renderJoinArea() {
    const { baseTableNames, joinTableNames } = this.state;
    if (!baseTableNames[0]) return null;

    const renderBaseTableTags = compose(Tag, name => ({
      text: name,
      large: true,
      intent: "primary",
      onClose: this.removeBaseTableNames
    }));
    const renderJoinTableTags = compose(Tag, name => ({
      text: name,
      large: true,
      intent: "primary",
      onClose: () => this.removeJoinTableNames(name)
    }));
    const baseTableTags = map(renderBaseTableTags, baseTableNames);
    const joinTableTags = map(renderJoinTableTags, joinTableNames);

    return (
      <Layout.Row divider key="dataSource">
        <Layout.Column width={50} overFlow divider>
          {baseTableTags}
        </Layout.Column>
        <Layout.Column overFlow>{joinTableTags}</Layout.Column>
      </Layout.Row>
    );
  }
  renderMenu() {
    return (
      <Layout.Row divider key="datasourceOptions">
        {this.renderDataSourcesOptions()}
      </Layout.Row>
    );
  }
  renderTablePreview() {
    const { baseTableNames, joinTableNames } = this.state;
    if (!baseTableNames[0]) return null;

    const schema = () => {
      if (!joinTableNames[0]) return this.getUserSchema(baseTableNames[0]);
      return union(
        this.getUserSchema(baseTableNames[0]),
        this.getUserSchema(joinTableNames[0])
      );
    };

    const items = () => {
      if (!joinTableNames[0]) {
        return this.getItems(baseTableNames[0]);
      }
      return joinInner(
        "entry_date",
        this.getItems(baseTableNames[0]),
        this.getItems(joinTableNames[0])
      );
    };
    const itemsCount = length(items());

    return (
      <Layout.Row key="renderDataSourceTable">
        {previewTableRender(schema(), items(), itemsCount)}
      </Layout.Row>
    );
  }

  // EVENTS
  handleTagClick(tableName) {
    if (!isEmpty(this.state.baseTableNames))
      return this.getDataSource(tableName).then(() =>
        this.setJoinTableNames(tableName)
      );
    return this.getDataSource(tableName).then(() =>
      this.setBaseTableNames(tableName)
    );
  }
}

const mapStateToProps = state => {
  const dataStore = state.analytics.dataSource;

  return {
    store: filterItems(dataStore),
    isLoading: dataStore.isLoading,
    message: dataStore.message
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDataSources: dataSourceActions.getDataSources,
      getDataSource: dataSourceActions.getDataSource,
      addDataSource: dataSourceActions.creatDataSource,
      removeDataSource: dataSourceActions.removeDataSource,
      getJoinTable: dataSourceActions.getJoinTable,
      createJoinTable: dataSourceActions.createJoinTable
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DataSource);
