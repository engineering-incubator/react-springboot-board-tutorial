import React from 'react';
import styled from '@emotion/styled';

interface ErrorType {
  text: string;
}

const ErrorText = ({ text }: ErrorType) => {
  // const { input, valid } = useSignupState();
  // const upperText = text.toLocaleLowerCase();
  // const inputValue = input[upperText];
  // const validValue = valid[upperText];
  // const isError = !!inputValue && !validValue;

  return <StyledError>{text}</StyledError>;
};

const StyledError = styled.span`
  padding: 12px 0 0 4px;
  font-size: 12px;
  color: #ff7777;
`;

export default ErrorText;
