import React, { Component } from "react";
import { Layout, Button } from "lib";

const pushRoute = path => window.history.pushState([], "", path);
class AbstractClass extends Component {
  searchConfig = [
    {
      label: "Owner",
      type: "searchbox"
    },
    {
      label: "Created on or after",
      type: "datebox"
    },
    {
      label: "Created on or before",
      type: "datebox"
    },
    {
      label: "Show starred only",
      type: "checkbox"
    },
    {
      label: "Recents only",
      type: "checkbox"
    }
  ];

  renderNavigation() {
    return (
      <Layout.Row divider>
        <Button.Minimal
          onClick={pushRoute("/app/analytics/dashboard")}
          text="Dashboard"
        />
        <Button.Minimal
          onClick={pushRoute("/app/analytics/reports")}
          text="Reports"
        />
      </Layout.Row>
    );
  }
}

export default AbstractClass;
