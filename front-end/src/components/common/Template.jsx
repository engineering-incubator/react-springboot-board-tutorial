import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
	margin: 0 auto;
	padding: 2rem;
	width: 500px;
	height: 700px;
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
			<MainContainer>
				<Title>{title}</Title>
				{children}
			</MainContainer>
	);
};
export default Template;
