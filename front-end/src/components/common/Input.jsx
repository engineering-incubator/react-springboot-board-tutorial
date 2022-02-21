import React from 'react';

const Input = ({ type, value, inputText, handleChange }) => {
  return (
    <input type={type} value={value} name={inputText} onChange={handleChange} id={inputText} />
  );
};

export default Input;
