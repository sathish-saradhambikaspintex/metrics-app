import React, { PureComponent } from "react";
import { Tabs, Icon } from "lib";

class FormField extends PureComponent {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	// PUBLIC METHODS
	getFieldData = () => this.props.schema;

	// PRIVATE METHODS
	render() {
		return (
			<Tabs.Container id="parent">
				<Tabs.Element id="display-tab" panel={this.renderDisplayTab()} target={<Icon large icon="info" />} />
				<Tabs.Element id="data-tab" panel={this.renderDataTab()} target={<Icon large icon="wpforms" />} />
				<Tabs.Element
					id="validation-tab"
					panel={this.renderValidationTab()}
					target={<Icon large icon="check-circle-o" />}
				/>
			</Tabs.Container>
		);
	}

	// EVENT HANDLERS
	handleChange(data) {
		return this.props.onChange({ id: this.props.id, ...data });
	}
}

export default FormField;
