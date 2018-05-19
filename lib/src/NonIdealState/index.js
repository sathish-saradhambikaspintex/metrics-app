import React from "react";
import Icon from "../Icon";
import Text from "../Text";
import Container from "./StyledContainer";

const visualIconStyle = {
	color: "rgba(92, 112, 128, 0.5)",
	fontSize: "70px",
	lineHeight: "1.5em",
};

const NonIdealState = ({ visual = null, action, title, description }) => (
	<Container>
		{React.isValidElement(visual) ? visual : <Icon style={visualIconStyle} icon={visual} />}
		{title && <Text.Heading size={4} text={title} />}
		{description && <Text.RunningText>{description}</Text.RunningText>}
		{React.isValidElement(action) ? action : <Text.RunningText>{action}</Text.RunningText>}
	</Container>
);

export default NonIdealState;
