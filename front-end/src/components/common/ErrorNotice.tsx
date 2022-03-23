import React, { useReducer } from 'react';
import styled from '@emotion/styled';
import { ERROR_SIGNUP_TEXT, ERROR_SIGNUP_TYPE } from '_/constants';

interface ErrorType {
  text: ERROR_SIGNUP_TYPE;
}

const ErrorText = ({ text }: ErrorType) => {
  return <StyledError>{ERROR_SIGNUP_TEXT[text]}</StyledError>;
};

const StyledError = styled.p<{ isError?: boolean }>`
  padding-top: 12px;
  font-size: 12px;
  color: ${({ isError }) => (isError ? 'red' : 'gray')};
`;

export default ErrorText;
