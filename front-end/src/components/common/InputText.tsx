import React from 'react';
import styled from '@emotion/styled';
import { StyledCommonLabel } from '_/styles/common';

export type InputTypes = {
  type: string;
  name: string;
  value: string;
  text: string;
  isValid: boolean;
  disabled?: boolean;
  onChangeInput(e: React.FormEvent<HTMLInputElement>): void;
};

const InputText = ({ type, value, isValid, name, text, disabled, onChangeInput }: InputTypes) => {
  return (
    <>
      {text && <StyledCommonLabel htmlFor={text}>{text}</StyledCommonLabel>}
      <StyledInput
        type={type}
        value={value}
        name={name}
        isValid={isValid}
        disabled={disabled}
        placeholder={text}
        onChange={onChangeInput}
        id={name}
      />
    </>
  );
};

const StyledInput = styled.input<{ isValid: boolean }>`
  width: 100%;
  height: 35px;
  padding-left: 8px;
  border: 1px solid ${({ isValid }) => (isValid ? '#ff7777' : '#ddd')};
  border-radius: 4px;
  box-sizing: border-box;
`;

export default InputText;
