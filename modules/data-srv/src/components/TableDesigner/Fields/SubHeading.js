import React from "react";
import { Layout, Text } from "lib";
import styled from "styled-components";

const FieldSetTitle = styled(Text.Heading)`
	border-bottom: 1px solid black;
`;

const FieldSetLayout = props => {
	const { title } = props;
	return (
		<Layout.Row>
			<FieldSetTitle text={title} />
		</Layout.Row>
	);
};

export default FieldSetLayout;
