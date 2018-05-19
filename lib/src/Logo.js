import React from "react";
import styled from "styled-components";
import SvgIcon, { Path } from "./SvgIcon";

const Title = styled.span`
	padding: 0 1rem;
	font-weight: 500;
	font-size: 1.2rem;
`;

const Logo = ({ size = 24, light, children }) => {
	if (light) {
		return (
			<span>
				<SvgIcon size={size} viewBox="0 0 24 24">
					<g>
						<Path
							strokeOpacity="0"
							fill="#ffffff"
							d="m23.49944,4.79977l-4,0l0,-4l-3,0l0,4l-4,0l0,3l4,0l0,4l3,0l0,-4l4,0l0,-3zm-8,8l0,0"
							stroke="#000000"
						/>
						<Path
							strokeOpacity="0"
							fill="#ffffff"
							d="m16.60068,13l-6,0l0,-6l-4,0l0,6l-6,0l0,4l6,0l0,6l4,0l0,-6l6,0l0,-4z"
							stroke="#000000"
						/>
					</g>
				</SvgIcon>
				<Title>HeadOffice</Title>
			</span>
		);
	}

	return (
		<span>
			<SvgIcon size={size}>
				<Path fill="url(#svg_6)" d="m24 5l-4 0 0-4 -3 0 0 4 -4 0 0 3 4 0 0 4 3 0 0-4 4 0 0-3zM16 13 16 13" />
				<Path fill="url(#svg_7)" d="m16 13l-6 0 0-6 -4 0 0 6 -6 0 0 4 6 0 0 6 4 0 0-6 6 0 0-4z" />
				<defs>
					<linearGradient y2="0" x2="1" y1="1" x1="0" id="svg_6">
						<stop offset="0" stopOpacity="1" stopColor="#333333" />
						<stop offset="1" stopOpacity="1" stopColor="#b2b2b2" />
					</linearGradient>
					<linearGradient y2="0" x2="1" y1="1" x1="0" spreadMethod="pad" id="svg_7">
						<stop offset="0" stopOpacity="1" stopColor="#ff7f7f" />
						<stop offset="1" stopOpacity="1" stopColor="#d61717" />
					</linearGradient>
				</defs>
			</SvgIcon>
			<Title>HeadOffice</Title>
		</span>
	);
};

export default Logo;
