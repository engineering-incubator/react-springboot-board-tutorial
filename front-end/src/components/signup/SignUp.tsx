import React, { useState, useMemo } from 'react';
import InputText from '_/components/common/InputText';
import { inputValidation } from '_/utils/validation';
import {
  ID_VALIDATION,
  PW_VALIDATION,
  EMAIL_VALIDATION,
  DOMAIN_VALIDATION,
  EMAIL_DOMAINS,
} from '_/constants';

const SignUp = () => {
  const [inputText, setInputText] = useState({
    id: '',
    pw: '',
    administrator: false,
  });

  const [isInputValid, setIsInputValid] = useState({
    id: false,
    pw: false,
    email: false,
    digit: false,
    administrator: false,
  });

  const [inputEmail, setInputEmail] = useState({
    email: '',
    domain: '',
    isInput: false,
  });

  const handleChangeInput = (regType: RegExp) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValid: boolean = inputValidation(value, regType);

    setIsInputValid({
      ...isInputValid,
      [name]: isValid,
    });

    setInputText({
      ...inputText,
      [name]: value,
    });
  };

  const handleChangeEmail = (regType: RegExp) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = inputValidation(value, regType);

    setIsInputValid({
      ...isInputValid,
      email: isValid,
    });

    setInputEmail({
      ...inputEmail,
      email: value,
    });
  };

  const handleChangeEmailDomain = (regType: RegExp) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = inputValidation(value, regType);

    setIsInputValid({
      ...isInputValid,
      email: isValid,
    });

    setInputEmail({
      ...inputEmail,
      domain: value,
    });
  };

  const handleChangeSelect = (regType: RegExp) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const isInput = value === '직접입력';
    const isValid = inputValidation(value, regType);
    console.log(isValid);

    setIsInputValid({
      ...isInputValid,
      email: isValid,
    });

    setInputEmail({
      ...inputEmail,
      isInput: isInput,
      domain: isInput ? '' : value,
    });
  };

  const handleSubmit = () => {
    const { id: idValue, pw: pwValue } = inputText;
    if (!idValue) {
      alert('id 없어요');
    }
    if (!pwValue) {
      alert('pw 가 없어요');
    }
  };

  console.log(isInputValid);
  console.log(inputEmail);

  return (
    <main>
      <div>
        <input type="radio" name="administrator" id="admin" value="admin" />
        <label htmlFor="admin">admin</label>
        <input type="radio" name="administrator" id="normal" value="normal" />
        <label htmlFor="normal">normal</label>
      </div>

      <InputText
        type="text"
        name="id"
        text="아이디"
        placeholder="id를 입력해주세요"
        value={inputText.id}
        handleChange={handleChangeInput(ID_VALIDATION)}
      />
      {!isInputValid.id && !!inputText.id && (
        <p>아이디는 5자 이상 15자 이하 영문+숫자만 가능합니다.</p>
      )}
      <InputText
        type="password"
        name="pw"
        text="비밀번호"
        placeholder="pw를 입력해주세요"
        value={inputText.pw}
        handleChange={handleChangeInput(PW_VALIDATION)}
      />
      {!isInputValid.pw && !!inputText.pw && (
        <p>패스워드는 최소8자 특수문자, 대문자, 숫자를 각각 최소 1개 포함하여야 합니다.</p>
      )}
      <div>
        <InputText
          type="text"
          name="email"
          text="이메일"
          placeholder="email을 입력해주세요"
          value={inputEmail.email}
          handleChange={handleChangeEmail(EMAIL_VALIDATION)}
        />
        @
        <select onChange={handleChangeSelect(DOMAIN_VALIDATION)}>
          <option hidden={true} value="">
            선택하세요.
          </option>
          <option key={0}>직접입력</option>
          {EMAIL_DOMAINS.map(({ value }, idx) => (
            <option key={idx + 1}>{value}</option>
          ))}
        </select>
        {inputEmail.isInput && (
          <InputText
            type="text"
            name="isInput"
            placeholder="domain을 입력해주세요"
            value={inputEmail.domain}
            handleChange={handleChangeEmailDomain(DOMAIN_VALIDATION)}
          />
        )}
      </div>

      <button onClick={handleSubmit}>submit</button>
    </main>
  );
};

export default SignUp;
