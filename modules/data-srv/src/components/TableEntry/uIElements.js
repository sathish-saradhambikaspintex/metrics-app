/* eslint-disable react/display-name */
import React from "react";
import { Controls } from "lib";

export default {
	bool: props => {
		return <Controls.Checkbox {...props} />;
	},
	date: props => {
		return <Controls.Input {...props} fill type="date" />;
	},
	"datetime-local": props => {
		return <Controls.Input {...props} fill type="datetime-local" />;
	},
	decimal: props => {
		return <Controls.Input {...props} fill type="number" />;
	},
	double: props => {
		return <Controls.Input {...props} fill type="number" />;
	},
	int: props => {
		return <Controls.Input {...props} fill type="number" />;
	},
	"long-text": props => {
		return <Controls.TextArea {...props} fill />;
	},
	month: props => {
		return <Controls.Input {...props} fill type="month" />;
	},
	table: props => {
		return null;
	},
	text: props => {
		return <Controls.Input {...props} fill type="text" />;
	},
	time: props => {
		return <Controls.Input {...props} fill type="time" />;
	},
	null: () => null,
};
