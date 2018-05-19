import React from "react";

export default function Stacked({ children, ...props }) {
	return (
		<div style={{ marginBottom: 10 }} {...props}>
			{children}
		</div>
	);
}
