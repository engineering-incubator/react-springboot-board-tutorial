import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
	font-size: 1rem;
	border: none;
	border-bottom: 1px solid;
	margin: 10px 0;
	outline: none;
	width: 100%;
`;

const Input = (props) => {
	return (
		<>
			<label>{props.placeholder}</label>
			<StyledInput {...props} />
		</>
	);
};

export default Input;
