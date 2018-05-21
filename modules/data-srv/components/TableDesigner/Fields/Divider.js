import React from "react";
import { Layout } from "lib";
import styled from "styled-components";

const PanelRow = styled(Layout.Row)`
	border: 1px solid black;
`;

const PanelLayout = () => {
	return <PanelRow />;
};

export default PanelLayout;
