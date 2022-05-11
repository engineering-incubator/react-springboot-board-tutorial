import React from "react";
import styled from "styled-components";

export const StyledFloatingButton = styled.button`
	color: #fff;
	background: #000;
	border: none;
  color: #fff;
	border-radius: 40px;
  width: 70px;
  height: 70px;
	z-index: 1;
	position: fixed;
  right: 0;
  bottom: 0;
  margin-right: 40px;
  margin-bottom: 40px;
`;

const FloatingButton = (props) => <StyledFloatingButton {...props}>{props.text}</StyledFloatingButton>;

export default FloatingButton;