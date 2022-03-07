import React from 'react';

export type InputTypes = {
  type: string;
  name: string;
  text?: string;
  placeholder: string;
  value: string;
  handleChange(e: React.FormEvent<HTMLInputElement>): void;
};

const InputText = ({ type, name, value = '', placeholder, text, handleChange }: InputTypes) => {
  return (
    <div>
      {!name && <label htmlFor={text}>{text}</label>}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        id={name}
      />
    </div>
  );
};

export default InputText;
