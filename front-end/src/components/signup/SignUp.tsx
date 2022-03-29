import React, { useMemo, useState, useRef } from 'react';
import styled from '@emotion/styled';
import InputText, { focusRef } from '_/components/common/InputText';
import InputRadio from '_/components/common/InputRadio';
import { inputValidation } from '_/utils/validation';
import { USERNAME_VALIDATION } from '_/config';
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
import { colors } from '_/styles/variables';
import { fetchPostApi, generateUrl } from '_/api';

const SignUp = () => {
  // const focusRef = useRef<focusRef>(null);
  const elRef = useRef<focusRef>(null);
  const { input, valid } = useSignupState();
  const dispatch = useSignupDispatch();
  const { username, password, email, phone_number: phoneNumber, permission } = input;
  const {
    username: validusername,
    password: validPassword,
    email: validEmail,
    phone_number: validPhoneNumber,
    permission: validPermission,
  } = valid;
  const [isClicked, setIsClicked] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regType = getValidationReg(name as typeValidation) || USERNAME_VALIDATION;
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
    // if (!elRef.current) return;
    // elRef.current['password']();
    if (!isCompleted) return;

    const url = generateUrl('/v1/authentication/sign-up');
    (async () => {
      const response = await fetchPostApi(url, input);
    })();
  };

  console.log(elRef);

  return (
    <StyledCommonWrap>
      <StyledCommonTitle>회원가입</StyledCommonTitle>
      <StyledSignupWrap>
        <StyledArea>
          <StyledCommonLabel as={'span'} isError={permission === PERMISSIONS.NONE && isClicked}>
            권한
          </StyledCommonLabel>
          <StyledPermission>
            {PERMISSION_KIND.map((i) => (
              <InputRadio
                name="permission"
                text={PERMISSIONS[i]}
                isInValid={permission === PERMISSIONS.NONE && isClicked}
                isChecked={permission === PERMISSIONS[i]}
                onChangeRadio={onChangeRadio(PERMISSIONS[i])}
                key={i}
              />
            ))}
          </StyledPermission>
          {permission === PERMISSIONS.NONE && isClicked && (
            <ErrorNotice text="필수 선택 항목입니다" />
          )}
          <StyledNotice isNotice={permission !== PERMISSIONS.NONE && !validPermission && isClicked}>
            {SIGNUP_PLACEHOLDER['PERMISSION']}
          </StyledNotice>
        </StyledArea>

        <StyledArea>
          <StyledInputWrap>
            <InputText
              ref={elRef}
              type="text"
              isInValid={(!!username && !validusername) || (!username && isClicked)}
              value={username}
              name="username"
              text="아이디"
              onChangeInput={onChangeInput}
            />
            {!username && isClicked && <ErrorNotice text="필수 입력 항목입니다" />}
            <StyledNotice isNotice={!!username && !validusername && isClicked}>
              {SIGNUP_PLACEHOLDER['USERNAME']}
            </StyledNotice>
          </StyledInputWrap>
        </StyledArea>
        <StyledArea>
          <StyledInputWrap>
            <InputText
              ref={elRef}
              type="password"
              isInValid={(!!password && !validPassword) || (!password && isClicked)}
              value={password}
              name="password"
              text="비밀번호"
              onChangeInput={onChangeInput}
            />
            {!password && isClicked && <ErrorNotice text="필수 입력 항목입니다" />}
            <StyledNotice isNotice={!!password && !validPassword && isClicked}>
              {SIGNUP_PLACEHOLDER['PASSWORD']}
            </StyledNotice>
          </StyledInputWrap>
        </StyledArea>

        <StyledArea>
          <StyledInputWrap>
            <InputText
              ref={elRef}
              type="text"
              isInValid={(!!email && !validEmail) || (!email && isClicked)}
              value={email}
              name="email"
              text="이메일"
              onChangeInput={onChangeInput}
            />
            {!email && isClicked && <ErrorNotice text="필수 입력 항목입니다" />}
            <StyledNotice isNotice={!!email && !validEmail && isClicked}>
              {SIGNUP_PLACEHOLDER['EMAIL']}
            </StyledNotice>
          </StyledInputWrap>
        </StyledArea>

        <StyledArea>
          <StyledInputWrap>
            <InputText
              ref={elRef}
              type="text"
              isInValid={(!!phoneNumber && !validPhoneNumber) || (!phoneNumber && isClicked)}
              value={phoneNumber}
              name="phone_number"
              text="전화번호"
              onChangeInput={onChangeInput}
            />
            {!phoneNumber && isClicked && <ErrorNotice text="필수 입력 항목입니다" />}
            <StyledNotice isNotice={!!phoneNumber && !validPhoneNumber && isClicked}>
              {SIGNUP_PLACEHOLDER['PHONE_NUMBER']}
            </StyledNotice>
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
  color: ${({ isNotice }) => (isNotice ? `${colors.warning}` : `${colors.gray1}`)};
`;

const StyledInputWrap = styled.div`
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
`;

SignUp.displayName = 'signUp';

export default SignUp;
