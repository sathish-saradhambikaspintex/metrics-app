import React from "react";
import Dialog from "./Dialog";

import Button from "../Button";

const Alert = props => {
	const { message, ...other } = props;
	return (
		<Dialog {...other}>
			{"ALERT MESSAGE"}
			{message}
			<div>
				<Button text="Cancel" tabIndex="2" />
				<Button intent="danger" text="Ok" tabIndex="1" />
			</div>
		</Dialog>
	);
};

Alert.displayName = "HO.Dialog.Alert";
export default Alert;
