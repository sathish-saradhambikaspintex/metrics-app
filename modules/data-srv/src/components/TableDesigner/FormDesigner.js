import shortId from "shortid";
import Fields from "./Fields";
import React, { Component } from "react";
import makeDraggable from "./makeDraggable";
import { Tag, Layout, Text } from "lib";
import makeDropTarget from "./makeDropTarget";
import normalizeScheme from "./transformSchema";
import {
	compose,
	reduce,
	map,
	is,
	assocPath,
	remove,
	over,
	pathOr,
	lensProp,
	split,
	isEmpty,
	findIndex,
	propEq,
	append,
	find,
	values,
	prop,
	adjust,
	assoc,
} from "ramda";
const getNewId = shortId.generate;
const jsonSchemaLens = lensProp("jsonSchema");
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

class FormDesigner extends Component {
	static displayName = "HO.FormDesigner";
	state = {
		id: null,
		jsonSchema: [],
	};
	setCurrElementId = id => this.setState({ id });
	getCurrElementId = () => pathOr(null, ["id"], this.state);
	getSchema = () => pathOr([], ["jsonSchema"], this.state);
	setSchema = schema => this.setState({ jsonSchema: schema });
	getSchemeIndex = id => findIndex(propEq("id", id), this.state.jsonSchema);
	getScheme = id => {
		const scheme = find(propEq("id", id), this.state.jsonSchema);
		if (!scheme) return {};
		return scheme;
	};
	setScheme = (id, setFn) => {
		const idx = this.getSchemeIndex(id);
		if (idx === -1) return this.setState(over(jsonSchemaLens, append(setFn({ id }))));
		return this.setState(over(jsonSchemaLens, adjust(setFn, idx)));
	};
	unsetScheme = id => {
		const idx = this.getSchemeIndex(id);
		if (idx !== -1) return this.setState(over(jsonSchemaLens, remove(idx, 1)));
	};
	getJSONSchema = () => {
		const schema = this.getSchema();
		const nrmSchema = map(normalizeScheme, schema);
		return reduce((obj, scheme) => assoc(scheme.name, scheme, obj), {}, nrmSchema);
	};

	constructor(props) {
		super(props);

		this.renderTags = this.renderTags.bind(this);
		this.renderPlaceHolder = this.renderPlaceHolder.bind(this);
		this.handlePropsChange = this.handlePropsChange.bind(this);
		this.handlePreviewClick = this.handlePreviewClick.bind(this);
		this.handleRemoveField = this.handleRemoveField.bind(this);

		this.handleElementSwapDrop = this.handleElementSwapDrop.bind(this);
		this.handleNewElementDrop = this.handleNewElementDrop.bind(this);
	}

	render() {
		const id = this.getCurrElementId();
		const data = this.getSchema();
		const placeHolders = isEmpty(data)
			? null
			: map(compose(makeDropTarget, makeDraggable, this.renderPlaceHolder))(data);
		const defaultDropTarget = makeDropTarget(
			<div
				onDrop={this.handleNewElementDrop}
				style={{
					minHeight: 100,
					flex: "0 0 100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text.Heading size={3} text="Drop fields here" />
			</div>
		);

		return (
			<Layout.Row key="content" height={95.5}>
				<Layout.Column width={20} divider overFlow>
					{this.renderSideBar(id)}
				</Layout.Column>
				<Layout.Column
					overFlow
					onClick={id ? this.handlePreviewClick : undefined}
					style={{ display: "flex", flexFlow: "row wrap" }}
				>
					{placeHolders}
					{defaultDropTarget}
				</Layout.Column>
			</Layout.Row>
		);
	}

	renderSideBar(id) {
		if (!id) {
			const elements = compose(map(makeDraggable), values, map(prop("TagIcon")))(Fields);
			return <Tag.FlexWrapper>{elements}</Tag.FlexWrapper>;
		}

		const schema = this.getScheme(id);
		const FieldProperties = compose(prop(schema.displayType), map(prop("Field")))(Fields);
		return <FieldProperties schema={schema} id={id} onChange={this.handlePropsChange} />;
	}

	// HELPERS
	renderPlaceHolder(schema) {
		const { id, displayType } = schema;
		const PlaceHolder = compose(prop(displayType), map(prop("PlaceHolder")))(Fields);
		const isCurrent = this.getCurrElementId() === id;
		return (
			<PlaceHolder
				id={id}
				key={id}
				schema={schema}
				containerWidth={1040}
				isCurrent={isCurrent}
				onChange={this.handlePropsChange}
				onEdit={this.setCurrElementId}
				onDelete={this.handleRemoveField}
				onDrop={this.handleElementSwapDrop}
			/>
		);
	}
	renderTags(fields) {
		const getTag = key => <Tag id={key} text={key} key={`${key}-tag`} />;
		return map(compose(makeDraggable, getTag), fields);
	}

	// EVENT HANDLER METHODS
	handlePropsChange(data) {
		const { value, id } = data;
		const name = compose(split("."), prop("name"))(data);
		if (is(Array, name)) return this.setScheme(id, assocPath(name, value));
		return this.setScheme(id, assoc(name, value));
	}
	handleRemoveField(id) {
		this.setCurrElementId(null);
		this.unsetScheme(id);
	}
	handleElementSwapDrop(dragTargetId, dropTargetId) {
		const startIndex = this.getSchemeIndex(dragTargetId);
		const endIndex = this.getSchemeIndex(dropTargetId);
		const list = this.getSchema();
		const newList = reorder(list, startIndex, endIndex);
		return this.setSchema(newList);
	}
	handleNewElementDrop(elementType) {
		const newId = getNewId();
		this.setCurrElementId(newId);
		this.handlePropsChange({ id: newId, name: "displayType", value: elementType });
	}
	handlePreviewClick() {
		this.setCurrElementId(null);
	}
}

export default FormDesigner;
