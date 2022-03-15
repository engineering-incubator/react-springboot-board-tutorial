import React, { useState, useMemo } from 'react';
import InputText from '_/components/common/InputText';
import { inputValidation } from '_/utils/validation';
import { ID_VALIDATION, EMAIL_VALIDATION, DOMAIN_VALIDATION, EMAIL_DOMAINS } from '_/constants';
import { getValidationReg, typeValidation } from '_/utils/validation';

type inputTypes = HTMLInputElement | HTMLSelectElement;

interface InputTextState {
  id: string;
  pw: string;
  digit: string;
  email: string;
  domain: string;
  administrator: boolean;
}

const SignUp = () => {
  const [isEmailManual, setIsEmailManual] = useState<boolean>(false);
  const [inputText, setInputText] = useState<InputTextState>({
    id: '',
    pw: '',
    digit: '',
    email: '',
    domain: '',
    administrator: false,
  });

  // NOTE  inputText, inputEmail 나눈것 처럼 valid 도 나누는게 나을지!?
  const [inputValid, setInputValid] = useState({
    id: false,
    pw: false,
    digit: false,
    email: false,
    domain: false,
    administrator: false,
  });

  const { id, pw, digit, email, domain } = inputText;
  const { id: idValid, pw: pwValid, email: emailValid, digit: digitValid } = inputValid;

  const handleChangeInput = <T extends inputTypes>(e: React.ChangeEvent<T>) => {
    const { name, value } = e.target;
    const regType = getValidationReg(name as typeValidation) || ID_VALIDATION;
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

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const isManual = value === '직접입력';

    if (isManual) setIsEmailManual(true);

    const isValid = inputValidation(value, DOMAIN_VALIDATION);

    setInputText({
      ...inputText,
      domain: isManual ? '' : value,
    });

    setInputValid({
      ...inputValid,
      domain: isValid,
    });
  };

  const handleClickEmailDirectCancel = () => {
    setIsEmailManual(false);
  };

  const handleSubmit = () => {
    // const { id: idValue, pw: pwValue } = inputText;
    // if (!idValue) {
    //   alert('id 없어요');
    // }
    // if (!pwValue) {
    //   alert('pw 가 없어요');
    // }
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

      <div>
        <InputText
          type="text"
          name="id"
          text="아이디"
          placeholder="id를 입력해주세요"
          value={id}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
        />
        {!idValid && !!id && <p>아이디는 5자 이상 15자 이하 영문+숫자만 가능합니다.</p>}
      </div>
      <div>
        <InputText
          type="password"
          name="pw"
          text="비밀번호"
          placeholder="pw를 입력해주세요"
          value={inputText.pw}
          handleChange={handleChangeInput}
        />
        {!pwValid && !!pw && (
          <p>패스워드는 최소8자 특수문자, 대문자, 숫자를 각각 최소 1개 포함하여야 합니다.</p>
        )}
      </div>

      <div>
        <InputText
          type="text"
          name="email"
          text="이메일"
          placeholder="email을 입력해주세요"
          value={email}
          handleChange={handleChangeInput}
        />
        @
        {
          <>
            {isEmailManual ? (
              <div>
                <InputText
                  type="text"
                  name="domain"
                  placeholder="domain을 입력해주세요"
                  value={domain}
                  handleChange={handleChangeInput}
                />
                <button type="button" onClick={handleClickEmailDirectCancel}>
                  X
                </button>
              </div>
            ) : (
              <select name="domain" defaultValue={'default'} onChange={handleChangeSelect}>
                <option disabled value="default">
                  선택하세요.
                </option>
                <option key={0}>직접입력</option>
                {EMAIL_DOMAINS.map(({ value }, idx) => (
                  <option key={idx + 1}>{value}</option>
                ))}
              </select>
            )}
          </>
        }
        {!email}
      </div>

      {/* <div>
        <select name="first.digit" id="digit" onChange={handleChangeDigit}>
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
          handleChange={handleChangeDigit}
        />
        <InputText
          type="number"
          name="third.digit"
          value={inputText.digit.third}
          handleChange={handleChangeDigit}
        />
      </div> */}

      <button onClick={handleSubmit}>submit</button>
    </main>
  );
};

export default SignUp;
