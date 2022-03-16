import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
	color: #fff;
	background: #000;
	border: none;
	padding: 10px 25px;
	width: 100%;
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
