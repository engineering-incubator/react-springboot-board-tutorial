import React, { useState } from 'react';
import InputText from '../common/InputText';
import { idValidation, pwValidation } from '../../utils/validation';

const SignUp = () => {
  const [inputText, setInputText] = useState({
    id: '',
    pw: '',
  });
  const [isInputValid, setIsInputValid] = useState({
    id: false,
    pw: false,
    email: false,
    digit: false,
  });

  const [inputEmail, setInputEmail] = useState('');

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const isValid = idValidation(value);
    console.log(value, isValid);

    setIsInputValid(() => {
      return {
        ...isInputValid,
        id: !isValid ? false : true,
      };
    });

    setInputText({
      ...inputText,
      [name]: value,
    });
  };

  // console.log(isInputValid);

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setInputEmail(value);
  };

  // console.log(inputText, inputEmail);
  return (
    <main>
      <InputText
        type="text"
        text="id"
        placeholder="id를 입력해주세요"
        value={inputText.id}
        handleChange={handleChangeInput}
      />
      {!isInputValid.id && <p>아이디 입력 오류</p>}
      <InputText
        type="password"
        text="pw"
        placeholder="pw를 입력해주세요"
        value={inputText.pw}
        handleChange={handleChangeInput}
      />
      <InputText
        type="text"
        text="email"
        placeholder="email을 입력해주세요"
        value={inputEmail}
        handleChange={handleChangeEmail}
      />
    </main>
  );
};

export default SignUp;
