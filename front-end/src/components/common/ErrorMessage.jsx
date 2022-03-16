import React from "react";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
	color: #fff;
	background: #ff0000;
	border-radius: 15px;
	padding: 5px 15px;
	font-size: 0.7rem;
	z-index: 1;
	position: absolute;
`;

const ErrorMessage = (props) => <StyledErrorMessage {...props} />;

export default ErrorMessage;
