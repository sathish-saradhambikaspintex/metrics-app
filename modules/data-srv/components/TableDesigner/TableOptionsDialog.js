/* eslint-disable react/display-name */
import React from "react";
import { Dialog, Button, Controls } from "lib";
const getWorkbooks = () => fetch("GET", "/api/formBuilder/books");

export default function(props) {
	const { workbook, handleChange } = props;
	return (
		<Dialog target={<Button intent="primary" text="Table Properties" style={{ marginLeft: "auto" }} />}>
			Table properties
			<Controls.Group.Inline>
				<Controls.Label text="Enter the WorkBook name" />
				<Controls.Select.Async
					name="workbook"
					value={workbook}
					placeholder="Select"
					loadOptions={getWorkbooks}
					onChange={handleChange}
				/>
			</Controls.Group.Inline>
			<Button.Group>
				<Button icon="times" text="Cancel" />
				<Button icon="floppy-o" intent="success" type="submit" text="Save" />
			</Button.Group>
		</Dialog>
	);
}
