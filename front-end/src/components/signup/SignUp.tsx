import React, { useState, useMemo } from 'react';
import InputText from '_/components/common/InputText';
import { inputValidation } from '_/utils/validation';
import {
  ID_VALIDATION,
  PW_VALIDATION,
  EMAIL_VALIDATION,
  DOMAIN_VALIDATION,
  DIGIT_FIRST_VALID,
  DIGIT_SECOND_VALID,
  DIGIT_THIRD_VALID,
  EMAIL_DOMAINS,
  DIGITS,
} from '_/constants';

type inputType = HTMLInputElement | HTMLSelectElement;

const SignUp = () => {
  const [inputText, setInputText] = useState({
    id: '',
    pw: '',
    digit: {
      first: '',
      second: '',
      third: '',
    },
    administrator: false,
  });

  const [inputEmail, setInputEmail] = useState({
    email: '',
    domain: '',
    isInput: false,
  });

  // NOTE  inputText, inputEmail 나눈것 처럼 valid 도 나누는게 나을지!?
  const [inputValid, setInputValid] = useState({
    id: false,
    pw: false,
    email: false,
    domain: false,
    digit: {
      first: false,
      second: false,
      third: false,
    },
    administrator: false,
  });

  const handleChangeInput = <T extends inputType>(e: React.ChangeEvent<T>, regType: RegExp) => {
    const { name, value } = e.target;
    const isValid: boolean = inputValidation(value, regType);

    setInputValid({
      ...inputValid,
      [name]: isValid,
    });

    setInputText({
      ...inputText,
      [name]: value,
    });
  };

  const handleChangeDigit = <T extends inputType>(e: React.ChangeEvent<T>, regType: RegExp) => {
    const { name, value } = e.target;
    if (value.length >= 5) return;

    const convertedName = name.split('.')[0];
    const isValid: boolean = inputValidation(value, regType);

    setInputValid({
      ...inputValid,
      digit: {
        ...inputValid.digit,
        [convertedName]: isValid,
      },
    });

    setInputText({
      ...inputText,
      digit: {
        ...inputText.digit,
        [convertedName]: value,
      },
    });
  };

  const handleChangeEmail = <T extends inputType>(e: React.ChangeEvent<T>, regType: RegExp) => {
    const { value, name } = e.target;
    const isValid = inputValidation(value, regType);

    setInputValid({
      ...inputValid,
      [name]: isValid,
    });

    setInputEmail({
      ...inputEmail,
      [name]: value,
    });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>, regType: RegExp) => {
    const { value } = e.target;
    const isInput = value === '직접입력';
    const isValid = inputValidation(value, regType);

    setInputValid({
      ...inputValid,
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

  // console.log(inputText);
  // console.log(inputEmail);
  // console.log(inputValid);

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
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeInput(e, ID_VALIDATION)
        }
      />
      {!inputValid.id && !!inputText.id && (
        <p>아이디는 5자 이상 15자 이하 영문+숫자만 가능합니다.</p>
      )}
      <InputText
        type="password"
        name="pw"
        text="비밀번호"
        placeholder="pw를 입력해주세요"
        value={inputText.pw}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeInput(e, PW_VALIDATION)
        }
      />
      {!inputValid.pw && !!inputText.pw && (
        <p>패스워드는 최소8자 특수문자, 대문자, 숫자를 각각 최소 1개 포함하여야 합니다.</p>
      )}
      <div>
        <InputText
          type="text"
          name="email"
          text="이메일"
          placeholder="email을 입력해주세요"
          value={inputEmail.email}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeEmail(e, EMAIL_VALIDATION)
          }
        />
        @
        <select
          id="emailDomain"
          name="domain"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChangeSelect(e, DOMAIN_VALIDATION)
          }>
          <option hidden={true} value="">
            선택하세요.
          </option>
          <option key={0}>직접입력</option>
          {EMAIL_DOMAINS.map(({ value }, idx) => (
            <option key={idx + 1}>{value}</option>
          ))}
        </select>
        <label htmlFor="emailDomain">
          <InputText
            type="text"
            name="domain"
            disabled={!inputEmail.isInput}
            placeholder="domain을 입력해주세요"
            value={inputEmail.domain}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeEmail(e, DOMAIN_VALIDATION)
            }
          />
        </label>
      </div>
      <div>
        <select
          name="first.digit"
          id="digit"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChangeDigit(e, DIGIT_FIRST_VALID)
          }>
          <option hidden={true}>선택하세요.</option>
          {DIGITS.map((number, idx) => (
            <option key={idx} value={number}>
              {number}
            </option>
          ))}
        </select>
        <InputText
          type="number"
          name="second.digit"
          value={inputText.digit.second}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeDigit(e, DIGIT_SECOND_VALID)
          }
        />
        <InputText
          type="number"
          name="third.digit"
          value={inputText.digit.third}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeDigit(e, DIGIT_THIRD_VALID)
          }
        />
      </div>

      <button onClick={handleSubmit}>submit</button>
    </main>
  );
};

export default SignUp;
