import React, { useState } from 'react';
import styled from '@emotion/styled';
import InputText from '_/components/common/InputText';
import InputRadio from '_/components/common/InputRadio';
import { inputValidation } from '_/utils/validation';
import { EMAIL_DOMAINS, ID_VALIDATION, DOMAIN_VALIDATION } from '_/config';
import { PERMISSIONS, PERMISSION_KIND, ERROR_SIGNUP } from '_/constants';
import { getValidationReg, typeValidation } from '_/utils/validation';
import { SIGNUP_CHANGE } from '_/reduce/actions';
import {
  StyledCommonWrap,
  StyledCommonCenter,
  StyledCommonTitle,
  StyledCommonButton,
  StyledCommonSelectWrap,
  StyledCommonSelectBox,
} from '_/styles/common';
import ErrorText from '_/components/common/ErrorNotice';
import { useSignupDispatch, useSignupState } from '_/context/SignContext';

const SignUp = () => {
  const { input } = useSignupState();
  const dispatch = useSignupDispatch();
  const { id, pw, digit, email, domain, permission } = input;
  const [isEmailManual, setIsEmailManual] = useState<boolean>(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regType = getValidationReg(name as typeValidation) || ID_VALIDATION;
    const isValid: boolean = inputValidation(value, regType);

    console.log(name, isValid);
    dispatch({
      type: SIGNUP_CHANGE,
      payload: {
        input: {
          name,
          value,
        },
        valid: {
          name,
          isValid,
        },
      },
    });
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const isManual = value === '직접입력';

    if (isManual) setIsEmailManual(true);

    const isValid = isManual ? false : inputValidation(value, DOMAIN_VALIDATION);

    dispatch({
      type: SIGNUP_CHANGE,
      payload: {
        input: {
          name,
          value: isManual ? '' : value,
        },
        valid: {
          name,
          isValid,
        },
      },
    });
  };

  const onClickEmailDirectCancel = () => {
    setIsEmailManual(false);
  };

  const onChangeRadio = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    dispatch({
      type: SIGNUP_CHANGE,
      payload: {
        input: {
          name,
          value,
        },
        valid: {
          name,
          isValid: true,
        },
      },
    });
  };

  // const isInputComplete = Object.values(inputState.input).every((i) => !!i);
  // const isValidComplete = Object.values(inputState.valid).every((i) => i);

  // console.log(inputState.input);
  // console.log(isComplete);
  const handleSubmit = () => {
    // const { id: idValue, pw: pwValue } = inputText;
    // if (!idValue) {
    //   alert('id 없어요');
    // }
    // if (!pwValue) {
    //   alert('pw 가 없어요');
    // }
  };

  return (
    <StyledCommonWrap>
      <StyledCommonTitle>회원가입</StyledCommonTitle>
      <StyledSignupWrap>
        <StyledArea>
          <StyledPermission>
            {PERMISSION_KIND.map((i) => (
              <InputRadio
                name="permission"
                text={PERMISSIONS[i]}
                isChecked={permission === PERMISSIONS[i]}
                onChangeRadio={onChangeRadio(PERMISSIONS[i])}
                key={i}
              />
            ))}
          </StyledPermission>
          <ErrorText text={ERROR_SIGNUP.PERMISSIONS} />
        </StyledArea>

        <StyledArea>
          <InputText
            type="text"
            name="id"
            text="아이디"
            placeholder="id를 입력해주세요"
            value={id}
            onChangeInput={onChangeInput}
          />
          <ErrorText text={ERROR_SIGNUP.ID} />
        </StyledArea>
        <StyledArea>
          <InputText
            type="password"
            name="pw"
            text="비밀번호"
            placeholder="pw를 입력해주세요"
            value={pw}
            onChangeInput={onChangeInput}
          />
          <ErrorText text={ERROR_SIGNUP.PW} />
        </StyledArea>

        <StyledArea>
          <StyledEmailArea>
            <InputText
              type="text"
              name="email"
              text="이메일"
              placeholder="email을 입력해주세요"
              value={email}
              onChangeInput={onChangeInput}
            />
            <StyledEmailUnit>@</StyledEmailUnit>
            {
              <>
                {isEmailManual ? (
                  <StyledDomainWrap>
                    <InputText
                      type="text"
                      name="domain"
                      placeholder="domain을 입력해주세요"
                      value={domain}
                      onChangeInput={onChangeInput}
                    />
                    <StyledRevertButton type="button" onClick={onClickEmailDirectCancel} />
                  </StyledDomainWrap>
                ) : (
                  <StyledDomainWrap>
                    <StyledCommonSelectWrap>
                      <StyledCommonSelectBox
                        name="domain"
                        defaultValue={'default'}
                        onChange={onChangeSelect}>
                        <option disabled hidden value="default">
                          선택하세요.
                        </option>
                        {EMAIL_DOMAINS.map(({ value }, idx) => (
                          <option key={idx + 1}>{value}</option>
                        ))}
                      </StyledCommonSelectBox>
                    </StyledCommonSelectWrap>
                  </StyledDomainWrap>
                )}
              </>
            }
          </StyledEmailArea>
          <ErrorText text={ERROR_SIGNUP.EMAIL} />
        </StyledArea>

        <StyledArea>
          <InputText
            type="text"
            name="digit"
            text="전화번호"
            placeholder="전화번호를 입력해주세요"
            value={digit}
            onChangeInput={onChangeInput}
          />
          <ErrorText text={ERROR_SIGNUP.DIGIT} />
        </StyledArea>

        {/* <StyledCommonButton isPositive={isInputComplete && isValidComplete} onClick={handleSubmit}> */}
        <StyledCommonButton isPositive={false} onClick={handleSubmit}>
          회원가입
        </StyledCommonButton>
      </StyledSignupWrap>
    </StyledCommonWrap>
  );
};

const StyledPermission = styled(StyledCommonCenter)`
  justify-content: space-between;
`;

const StyledArea = styled.div`
  margin-bottom: 20px;
`;

const StyledSignupWrap = styled.article`
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledEmailArea = styled.div`
  display: flex;
  align-items: center;
`;

const StyledEmailUnit = styled.span`
  padding: 0 4px;
`;

const StyledDomainWrap = styled.div`
  position: relative;
  flex: 1;
`;

const StyledRevertButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0px;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    right: 50%;
    width: 1px;
    height: 12px;
    background-color: black;
    content: '';
  }

  &::before {
    transform: translateY(-50%) rotate(45deg);
  }

  &::after {
    transform: translateY(-50%) rotate(-45deg);
  }
`;

export default SignUp;
