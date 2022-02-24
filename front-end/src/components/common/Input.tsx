import React from 'react';
import { inputTypes } from '_/components/common/InputText';

type inputPropsType = {
  inputText: string;
} & inputTypes;

const Input = ({ type, value, inputText, placeholder, handleChange }: inputPropsType) => (
  <input
    type={type}
    value={value}
    name={inputText}
    placeholder={placeholder}
    onChange={handleChange}
    id={inputText}
  />
);

export default Input;
