import React from 'react';
import Input from './Input';

const InputText = ({ type, value = '', text, handleChange }) => {
  return (
    <div>
      <label htmlFor={text}>{text}</label>
      <Input type={type} value={value} inputText={text} handleChange={handleChange} id={text} />
    </div>
  );
};

export default InputText;
