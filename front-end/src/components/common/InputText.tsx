import React from 'react';
import styled from '@emotion/styled';

export type InputTypes = {
  type: string;
  name: string;
  text?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  handleChange(e: React.FormEvent<HTMLInputElement>): void;
};

const InputText = ({
  type,
  name,
  text,
  value = '',
  placeholder,
  disabled,
  handleChange,
}: InputTypes) => {
  return (
    <StyledInputWrap>
      {!name && <label htmlFor={text}>{text}</label>}
      <StyledInput
        type={type}
        value={value}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        id={name}
      />
    </StyledInputWrap>
  );
};

const StyledInputWrap = styled.div`
  flex: 1;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

export default InputText;
