import React from "react";
import Text from "../Text";
import StyledContainer from "./StyledContainer";

const CallOut = ({ children, intent, heading }) => {
	return (
		<StyledContainer intent={intent}>
			<Text.Heading size={5} intent={intent} text={heading} />
			{children}
		</StyledContainer>
	);
};

CallOut.displayName = "HO.CallOut";
export default CallOut;
