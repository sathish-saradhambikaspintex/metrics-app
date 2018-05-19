import { clearToken } from "./auth";
import { pushRoute } from "./history";
import React, { Component } from "react";
import { Navbar, Logo, Button, Menu, Popover } from "lib";

class AppNavbar extends Component {
  render() {
    const { username, site } = this.props.loggedInUser;
    return (
      <Navbar>
        <Logo to="#">Head Office App</Logo>
        <Button.Minimal
          size="large"
          onClick={pushRoute("/app/data")}
          text="Data"
        />
        <Button.Minimal
          size="large"
          onClick={pushRoute("/app/analytics")}
          text="Analysis"
        />
        <Button.Minimal
          size="large"
          onClick={pushRoute("/app/users")}
          text="Users"
        />
        <Popover hover>
          <Button.Minimal
            rightIcon="caret-down"
            text={username}
            style={{ marginLeft: "auto" }}
          />
          <Menu>
            <Menu.Item icon="user" text={`Logged in as ${username}`} />
            <Menu.Item
              icon="power-off"
              text="Sign Out"
              onClick={this.signOut}
            />
            <Menu.Divider />
            <Menu.Item icon="cog" text="Settings...">
              <Menu.Item
                icon="add"
                text="Add new application"
                disabled={true}
              />
              <Menu.Item icon="remove" text="Remove application" />
            </Menu.Item>
          </Menu>
        </Popover>
        <Popover>
          <Button.Minimal rightIcon="caret-down" text={site} />
          <Menu>
            <Menu.Item icon="cog" text="Site Settings" />
            <Menu.Item icon="exclamation-circle" text="Manage Notifications" />
          </Menu>
        </Popover>
      </Navbar>
    );
  }

  signOut(e) {
    e.preventDefault();
    clearToken();
    return pushRoute("/logout", true)();
  }
}

export default AppNavbar;
