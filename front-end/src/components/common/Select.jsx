import React from "react";
import styled from "styled-components";

export const StyledSelect = styled.select`
	margin: 10px 0;
	display: block;
	width: 100%;
	padding: 5px;
	font-size: 1rem;
	border: 1px solid;
`;

const Select = (props) => <StyledSelect {...props} />;

export default Select;
