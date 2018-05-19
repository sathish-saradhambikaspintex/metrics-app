import React, { PureComponent } from "react";
import Popover from "../Popover";
import Icon from "../Icon";
import StyledMenuItem from "./StyledMenuItem";
import Menu from "./StyledMenu";

class MenuItem extends PureComponent {
	static displayName = "HO.Menu.Item";
	static defaultProps = { dismissPopover: true };
	render() {
		const { children } = this.props;
		if (children == null) return this.renderTarget();
		return this.renderPopover();
	}

	renderTarget() {
		const { icon, large, text, children, dismissPopover, disabled, onClick, ...restProps } = this.props;
		const componentProps = {
			large,
			tabIndex: "0",
			onClick: !disabled ? onClick : undefined,
			"data-dismiss": dismissPopover,
			...restProps,
		};
		const hasSubMenu = children != null;

		return (
			<StyledMenuItem {...componentProps}>
				{icon && <Icon large={large} icon={icon} style={{ marginRight: 10 }} />}
				{text}
				{hasSubMenu && <Icon icon="caret-right" style={{ marginLeft: "auto" }} />}
			</StyledMenuItem>
		);
	}
	renderPopover() {
		const { children } = this.props;
		return (
			<Popover hover>
				{this.renderTarget()}
				<Menu>{children}</Menu>
			</Popover>
		);
	}
}

export default MenuItem;
