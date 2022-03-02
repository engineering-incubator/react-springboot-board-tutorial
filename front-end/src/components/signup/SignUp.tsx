import React, { SyntheticEvent, useState } from 'react';
import InputText from '_/components/common/InputText';
import { inputValidation } from '_/utils/validation';
import { ID_VALIDATION, PW_VALIDATION } from '_/constants';

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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regType = name === 'id' ? ID_VALIDATION : PW_VALIDATION;
    const isValid = inputValidation(value, regType);

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

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputEmail(value);
  };

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
