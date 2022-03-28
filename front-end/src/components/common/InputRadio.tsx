import React from 'react';
import styled from '@emotion/styled';
import { blind } from '_/styles/mixin';

interface InputRadioProps {
  name: string;
  text: string;
  isChecked: boolean;
  onChangeRadio: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio = ({ name, text, isChecked, onChangeRadio }: InputRadioProps) => (
  <StyledLabel htmlFor={text} isChecked={isChecked}>
    <StyledInputRadio
      type="radio"
      name={name}
      id={text}
      checked={isChecked}
      onChange={onChangeRadio}
    />
    {text}
  </StyledLabel>
);

const StyledLabel = styled.label<{ isChecked: boolean }>`
  position: relative;
  padding-left: 18px;
  color: ${({ isChecked }) => (isChecked ? '#0078ff' : 'gray')};
  cursor: pointer;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    border-radius: 10px;
    border: 1px solid ${({ isChecked }) => (isChecked ? '#0078ff' : 'gray')};
    box-sizing: border-box;
    background-color: white;
    transform: translateY(-50%);
    transition: border-color 0.3s ease-in-out;
    content: '';
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 3px;
    width: 6px;
    height: 6px;
    border-radius: 4px;
    background-color: #0078ff;
    transition: transform 0.3s ease-in-out;
    transform: translateY(-50%) scale(${({ isChecked }) => (isChecked ? '1' : '0')});
    will-change: transform;
    content: '';
  }
`;

const StyledInputRadio = styled.input`
  ${blind}
`;

export default InputRadio;
