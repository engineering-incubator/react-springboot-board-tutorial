import React from "react";
import styled from "styled-components";

export const Select = styled.select`
	margin: 10px 0;
	display: block;
	width: 100%;
	padding: 5px;
	font-size: 1rem;
	border: 1px solid;
`;

const Selection = (props) => {
	return (
		<Select>
			{props.options.map((option) => (
				<option
					key={option.value}
					value={option.value}
					defaultValue={props.defaultValue === option.value}
				>
					{option.name}
				</option>
			))}
		</Select>
	);
};
export default Selection;
