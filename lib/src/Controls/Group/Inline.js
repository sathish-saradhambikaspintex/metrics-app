import React from "react";

export default function Inline({ children, width = 30, ...props }) {
	const rowStyle = {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: 10,
	};
	const labelSpan = `${width}%`;
	const inputSpan = `${100 - width}%`;
	const [label, ...other] = React.Children.toArray(children);
	const labelElement = React.cloneElement(label, {
		style: {
			flex: `0 0 ${labelSpan}`,
			maxWidth: `calc(${labelSpan} - 4px)`,
			wordWrap: "break-word",
		},
	});
	return (
		<div style={rowStyle} {...props}>
			{labelElement}
			<div style={{ flex: `0 0 ${inputSpan}` }}>{other}</div>
		</div>
	);
}
