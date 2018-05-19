import React from "react";
import { connect } from "react-redux";
import { Layout, Table } from "lib";
import { bindActionCreators } from "redux";
import AbstractClass from "./AbstractClass";

class Reports extends AbstractClass {
  render() {
    return (
      <div>
        {this.renderNavigation()}
        <Layout.Row>
          <Layout.Column width={15} divider />
          <Layout.Column>
            <Table.Container width={900} height={600} rowHeight={40}>
              <Table.Column label="S.no" />
              <Table.Column label="Name" />
              <Table.Column label="Dept" />
              <Table.Column label="Age" />
              <Table.Column label="Batch No" />
              <Table.Column label="Contact Details" />
            </Table.Container>
          </Layout.Column>
        </Layout.Row>
      </div>
    );
  }
}

const mapState = () => ({});
const mapDispatch = dispatch => bindActionCreators({}, dispatch);

export default connect(mapState, mapDispatch)(Reports);
