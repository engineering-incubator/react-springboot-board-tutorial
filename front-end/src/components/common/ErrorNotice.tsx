import React from 'react';
import styled from '@emotion/styled';
import { ERROR_SIGNUP_TEXT, ERROR_SIGNUP_TYPE } from '_/constants';
import { useSignupState } from '_/context/SignContext';

interface ErrorType {
  text: ERROR_SIGNUP_TYPE;
}

const ErrorText = ({ text }: ErrorType) => {
  const { input, valid } = useSignupState();
  const inputValue = input[text.toLocaleLowerCase()];
  const validValue = valid[text.toLocaleLowerCase()];
  const isError = !!inputValue && !validValue;

  return <StyledError isError={isError}>{ERROR_SIGNUP_TEXT[text]}</StyledError>;
};

const StyledError = styled.p<{ isError?: boolean }>`
  padding-top: 12px;
  font-size: 12px;
  color: ${({ isError }) => (isError ? 'red' : 'gray')};
`;

export default ErrorText;
