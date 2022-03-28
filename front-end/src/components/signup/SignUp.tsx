import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import InputText from '_/components/common/InputText';
import InputRadio from '_/components/common/InputRadio';
import { inputValidation } from '_/utils/validation';
import { ID_VALIDATION } from '_/config';
import { PERMISSIONS, PERMISSION_KIND, PERMISSION_TYPE, SIGNUP_PLACEHOLDER } from '_/constants';
import { getValidationReg, typeValidation } from '_/utils/validation';
import { SIGNUP_CHANGE } from '_/reduce/actions';
import {
  StyledCommonWrap,
  StyledCommonCenter,
  StyledCommonTitle,
  StyledCommonButton,
  StyledCommonLabel,
} from '_/styles/common';
import { useSignupDispatch, useSignupState } from '_/context/SignContext';
import ErrorNotice from '_/components/common/ErrorNotice';

const SignUp = () => {
  const { input, valid } = useSignupState();
  const dispatch = useSignupDispatch();
  const { id, pw, email, digit, permission } = input;
  const {
    id: validId,
    pw: validPw,
    email: validEmail,
    digit: validDigit,
    permission: validPermission,
  } = valid;
  const [isClicked, setIsClicked] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regType = getValidationReg(name as typeValidation) || ID_VALIDATION;
    const isValid = !!value ? inputValidation(value, regType) : false;

    dispatch({
      type: SIGNUP_CHANGE,
      payload: {
        name,
        value,
        isValid,
      },
    });
  };

  const onChangeRadio = (value: PERMISSION_TYPE) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    return dispatch({
      type: SIGNUP_CHANGE,
      payload: {
        name,
        value,
        isValid: true,
      },
    });
  };

  const inCompletedField = Object.entries(input).filter((item) => {
    if (!item[1] || item[1] === PERMISSIONS.NONE || !valid[item[0]]) {
      return item;
    }
  });
  const isCompleted = useMemo(() => !inCompletedField.length, [inCompletedField]);

  const handleSubmit = () => {
    setIsClicked(true);
    console.log(1);
    console.log(isCompleted);
  };

  return (
    <StyledCommonWrap>
      <StyledCommonTitle>회원가입</StyledCommonTitle>
      <StyledSignupWrap>
        <StyledArea>
          <StyledCommonLabel as={'span'}>권한</StyledCommonLabel>
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
          <StyledNotice isNotice={permission !== PERMISSIONS.NONE && !validPermission && isClicked}>
            {SIGNUP_PLACEHOLDER['PERMISSION']}
          </StyledNotice>
          {permission === PERMISSIONS.NONE && isClicked && (
            <ErrorNotice text="필수 입력 항목입니다" />
          )}
        </StyledArea>

        <StyledArea>
          <StyledInputWrap>
            <InputText
              type="text"
              isValid={!!id && !validId}
              value={id}
              name="id"
              text="아이디"
              onChangeInput={onChangeInput}
            />
            <StyledNotice isNotice={!!id && !validId && isClicked}>
              {SIGNUP_PLACEHOLDER['ID']}
            </StyledNotice>
            {!id && isClicked && <ErrorNotice text="필수 입력 항목입니다" />}
          </StyledInputWrap>
        </StyledArea>
        <StyledArea>
          <StyledInputWrap>
            <InputText
              type="password"
              isValid={!!pw && !validPw}
              value={pw}
              name="pw"
              text="비밀번호"
              onChangeInput={onChangeInput}
            />
            <StyledNotice isNotice={!!pw && !validPw && isClicked}>
              {SIGNUP_PLACEHOLDER['PW']}
            </StyledNotice>
            {!pw && isClicked && <ErrorNotice text="필수 입력 항목입니다" />}
          </StyledInputWrap>
        </StyledArea>

        <StyledArea>
          <StyledInputWrap>
            <InputText
              type="text"
              isValid={!!email && !validEmail}
              value={email}
              name="email"
              text="이메일"
              onChangeInput={onChangeInput}
            />
            <StyledNotice isNotice={!!email && !validEmail && isClicked}>
              {SIGNUP_PLACEHOLDER['EMAIL']}
            </StyledNotice>
            {!email && isClicked && <ErrorNotice text="필수 입력 항목입니다" />}
          </StyledInputWrap>
        </StyledArea>

        <StyledArea>
          <StyledInputWrap>
            <InputText
              type="text"
              isValid={!!digit && !validDigit}
              value={digit}
              name="digit"
              text="전화번호"
              onChangeInput={onChangeInput}
            />
            <StyledNotice isNotice={!!digit && !validDigit && isClicked}>
              {SIGNUP_PLACEHOLDER['EMAIL']}
            </StyledNotice>
            {!digit && isClicked && <ErrorNotice text="필수 입력 항목입니다" />}
          </StyledInputWrap>
        </StyledArea>

        <StyledCommonButton isPositive={isCompleted} onClick={handleSubmit}>
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

const StyledNotice = styled.p<{ isNotice: boolean }>`
  margin: 8px 4px;
  font-size: 12px;
  color: ${({ isNotice }) => (isNotice ? '#ff7777' : '#757575')};
`;

const StyledInputWrap = styled.div`
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
`;

export default SignUp;
