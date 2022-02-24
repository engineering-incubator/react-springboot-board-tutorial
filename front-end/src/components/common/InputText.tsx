import React, { SyntheticEvent } from 'react';
import Input from '_/components/common/Input';

export type inputTextProps = {
  text: string;
} & inputTypes;

export type inputTypes = {
  type: string;
  placeholder: string;
  value: string;
  handleChange(e: React.FormEvent<HTMLInputElement>): void;
};

const InputText = ({ type, value = '', placeholder, text, handleChange }: inputTextProps) => {
  return (
    <div>
      <label htmlFor={text}>{text}</label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        handleChange={handleChange}
        inputText={text || ''}
      />
    </div>
  );
};

export default InputText;
