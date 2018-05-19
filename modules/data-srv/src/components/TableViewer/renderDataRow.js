import React from "react";
import { Layout } from "lib";
import { prop, concat } from "ramda";
const getDisplayName = prop("title");
const getFieldName = prop("name");

export default function renderLayoutRow(data, scheme) {
	const fieldName = getFieldName(scheme);
	const displayName = getDisplayName(scheme);
	const key = concat(fieldName, "-datum-row");
	return (
		<Layout.Row key={key} data-key={key}>
			<Layout.Column width={40}>{displayName}</Layout.Column>
			<Layout.Column>{data}</Layout.Column>
		</Layout.Row>
	);
}
