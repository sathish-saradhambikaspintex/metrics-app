import { PureComponent } from "react";
import renderRow from "./renderRow";
import whitelist from "./whiteList";
import validate from "./validate";
import { propOr, assoc, map, compose, values } from "ramda";

const getWhiteListedSchemaWithValidator = map(compose(validate, whitelist));

export default class FormBuilder extends PureComponent {
	static displayName = "HO.FormBuilder";
	state = {};
	constructor(props) {
		super(props);
		this.getFormElements = this.getFormElements.bind(this);
		this.handleUIElementChange = this.handleUIElementChange.bind(this);

		this.jsonSchema = compose(getWhiteListedSchemaWithValidator, values)(props.jsonSchema);
		this.state = props.formData;
	}

	// PUBLIC METHODS
	render() {
		return map(this.getFormElements, this.jsonSchema);
	}
	getFormData() {
		return this.state;
	}
	setjsonSchema(schema) {
		this.jsonSchema = schema;
	}
	setFormData(data) {
		this.setState(data);
	}

	// PRIVATE METHODS
	getFormElements(scheme) {
		const { name, labelPosition, ...others } = scheme;
		const value = propOr(null, name, this.state);

		const props = { ...others, name, onChange: this.handleUIElementChange, value };
		const component = renderRow(labelPosition, props);
		return component;
	}

	// PRIVATE EVENT HANDLERS
	handleUIElementChange(event) {
		const { name, value } = event;
		this.setState(assoc(name, value));
	}
}
