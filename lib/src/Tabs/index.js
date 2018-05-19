import React, { Component } from "react";
import { identity, compose, map, filter, assoc, isEmpty, path, equals, not, head, merge } from "ramda";
import Container from "./StyledTabContainer";
import Panel from "./TabPanel";

const getTabId = path(["props", "id"]);
const getTabPanel = path(["props", "panel"]);

class TabContainer extends Component {
	static displayName = "HO.TabContainer";
	static defaultProps = { vertical: false };

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);

		const { defaultTab, children } = props;
		if (defaultTab !== undefined) {
			this.state = { selectedTabId: defaultTab };
		} else {
			const tabs = children;
			const getFirstTabsId = compose(getTabId, head);
			this.state = { selectedTabId: tabs.length === 0 ? undefined : getFirstTabsId(tabs) };
		}
	}
	componentWillReceiveProps(nextProps) {
		const { selectedTabId } = nextProps;
		if (selectedTabId !== undefined) this.setState({ selectedTabId });
	}
	render() {
		const { selectedTabId } = this.state;
		const { children, vertical } = this.props;
		const doesTabIdMatch = compose(equals(selectedTabId), getTabId);
		const doesTabPanelExist = compose(not, isEmpty, getTabPanel);

		const tabTitles = this.renderTabTitle(children);
		const tabPanel = compose(this.renderTabPanel, head, filter(doesTabIdMatch), filter(doesTabPanelExist))(children);

		return (
			<Container vertical={vertical}>
				{tabTitles}
				{tabPanel}
			</Container>
		);
	}

	renderTabTitle(children) {
		let { vertical, id: parentId } = this.props;

		const renderTitle = child => {
			const { id, target } = child.props;
			const childrenStyle = {
				flex: "1 0 auto",
				textAlign: "center",
				padding: "8px",
				cursor: "pointer",
			};
			const childProps = {
				key: `${parentId}-${id}`,
				"data-key": id,
				onClick: this.handleClick,
				style: childrenStyle,
			};

			return React.cloneElement(target, childProps);
		};

		let wrapperStyle = { display: "flex", borderBottom: "1px solid black", marginBottom: 10 };
		if (vertical)
			wrapperStyle = merge(wrapperStyle, {
				flexDirection: "column",
				alignItems: "flex-start",
			});

		return (
			<div style={wrapperStyle} key="tab-title-bar">
				{map(renderTitle, children)}
			</div>
		);
	}
	renderTabPanel(child) {
		const { panel, vertical, ...other } = child.props;
		return (
			<Panel vertical={vertical} {...other}>
				{panel}
			</Panel>
		);
	}

	// EVENT HANDLERS
	handleClick(event) {
		const tabId = event.target.dataset.key;
		const { onChange } = this.props;
		if (onChange) onChange(tabId);
		this.setState(assoc("selectedTabId", tabId));
	}
}

export default {
	Container: TabContainer,
	Element: identity,
};
