import React from "react";
import styled from "styled-components";

const TemplateContainer = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background: #fff;
	display: flex;
	justify-content: center;
`;

const MainContainer = styled.div`
	padding: 2rem;
	width: 500px;
	height: 5300px;
	background: #fff;
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);
	border-radius: 2px;
`;

const Title = styled.div`
	display: block;
	text-align: center;
	font-weight: bold;
	font-size: 1.2rem;
	padding: 1rem;
`;

const Template = ({ title, children }) => {
	return (
		<TemplateContainer>
			<MainContainer>
				<Title>{title}</Title>
				{children}
			</MainContainer>
		</TemplateContainer>
	);
};
export default Template;
