import React, { useMemo, useState, useRef } from 'react';
import styled from '@emotion/styled';
import InputText, { focusRef } from '../common/InputText';
import InputRadio from '../common/InputRadio';
import { inputValidation, getValidationReg, typeValidation } from '../../utils/index';
import { USERNAME_VALIDATION } from '../../config';
import { PERMISSIONS, PERMISSION_KIND, PERMISSION_TYPE, SIGNUP_PLACEHOLDER } from '../../constants';
import { SIGNUP_CHANGE } from '../../reduce/actions';
import {
  StyledCommonWrap,
  StyledCommonPositiveButton,
  StyledCommonTitle,
  StyledCommonLabel,
  StyledCommonFlexContainer,
  StyledCommonToastContainer,
  StyledCommonClosePopup,
} from '../../styles/common';
import {
  InitialStateSignupInputType,
  useSignupDispatch,
  useSignupState,
} from '../../context/signupContext';
import ErrorNotice from '../common/ErrorNotice';
import { colors } from '../../styles/variables';
import { postSignup } from '../../api';
import Loading from '../common/Loading';
import { isSuccessStatus } from '../../config/status.code.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const elRef = useRef<focusRef>(null);
  const { input, valid } = useSignupState();
  const dispatch = useSignupDispatch();
  const { username, password, email, phoneNumber, permission } = input;
  const {
    username: validUsername,
    password: validPassword,
    email: validEmail,
    phoneNumber: validPhoneNumber,
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

    // 입력안된 필드에 focus
    if (!isCompleted) {
      const focusField = inCompletedField[0][0];
      elRef?.current?.[focusField]();

      return;
    }

    (async () => {
      setIsLoading(true);
      // TODO fetchClient 를 한번 wrapping 해서~
      const response = await postSignup<InitialStateSignupInputType>(input);
      const { code, message } = response;
      const isSuccess = isSuccessStatus(code);

      const CloseButton = ({ closeToast }: { closeToast: () => void }) => {
        const onClickClose = () => {
          setIsLoading((prev) => {
            closeToast();
            if (isSuccess) {
              window.location.href = '/';
            }
            return !prev;
          });
        };
        return <StyledCommonClosePopup onClick={onClickClose}>X</StyledCommonClosePopup>;
      };

      const toastMessage = isSuccess
        ? '회원가입에 성공하였습니다. 잠시후 메인으로 이동 합니다.'
        : message;
      const toastMehod = isSuccess ? 'success' : 'error';

      toast[toastMehod](toastMessage, {
        position: 'top-center',
        theme: 'dark',
        autoClose: isSuccess ? 2000 : false,
        onClose: isSuccess ? () => (window.location.href = '/') : undefined,
        closeButton: CloseButton,
      });
    })();
  };

  const isPermissionInvalid = useMemo(
    () => permission === PERMISSIONS.NONE && isClicked,
    [permission, isClicked],
  );
  const isPermissionInvalidNotice = useMemo(
    () => permission !== PERMISSIONS.NONE && !validPermission && isClicked,
    [permission, validPermission, isClicked],
  );

  const usernameInvalid = useMemo(() => !!username && !validUsername, [username, validUsername]);
  const usernameInvalidNotice = useMemo(() => !username && isClicked, [username, isClicked]);

  const passwordInvalid = useMemo(() => !!password && !validPassword, [password, validPassword]);
  const passwordInvalidNotice = useMemo(() => !password && isClicked, [password, isClicked]);

  const emailInvalid = useMemo(() => !!email && !validEmail, [email, validEmail]);
  const emailInvalidNotice = useMemo(() => !email && isClicked, [email, isClicked]);

  const phoneNumberInvalid = useMemo(
    () => !!phoneNumber && !validPhoneNumber,
    [phoneNumber, validPhoneNumber],
  );
  const phoneNumberInvalidNotice = useMemo(
    () => !phoneNumber && isClicked,
    [phoneNumber, isClicked],
  );

  return (
    <>
      {isLoading && <Loading isFull={true} msg={'요청을 처리중입니다.'} />}
      <StyledCommonToastContainer />
      <StyledCommonWrap>
        <StyledCommonTitle>회원가입</StyledCommonTitle>
        <StyledSignupWrap>
          <StyledArea>
            <StyledCommonLabel as={'span'} isError={isPermissionInvalid}>
              권한
            </StyledCommonLabel>
            <StyledCommonFlexContainer justify={'space-between'}>
              {PERMISSION_KIND.map((i) => (
                <InputRadio
                  name="permission"
                  text={PERMISSIONS[i]}
                  isInValid={isPermissionInvalid}
                  isChecked={permission === PERMISSIONS[i]}
                  onChangeRadio={onChangeRadio(PERMISSIONS[i])}
                  key={i}
                />
              ))}
            </StyledCommonFlexContainer>
            {isPermissionInvalid && <ErrorNotice text="필수 선택 항목입니다" />}
            <StyledNotice isInvalidNotice={isPermissionInvalidNotice}>
              {SIGNUP_PLACEHOLDER['PERMISSION']}
            </StyledNotice>
          </StyledArea>
          <StyledArea>
            <StyledInputWrap>
              <InputText
                ref={elRef}
                type="text"
                isInValid={usernameInvalid || usernameInvalidNotice}
                value={username}
                name="username"
                text="아이디"
                onChangeInput={onChangeInput}
              />
              {usernameInvalidNotice && <ErrorNotice text="필수 입력 항목입니다" />}
              <StyledNotice isInvalidNotice={usernameInvalid && isClicked}>
                {SIGNUP_PLACEHOLDER['USERNAME']}
              </StyledNotice>
            </StyledInputWrap>
          </StyledArea>
          <StyledArea>
            <StyledInputWrap>
              <InputText
                ref={elRef}
                type="password"
                isInValid={passwordInvalid || passwordInvalidNotice}
                value={password}
                name="password"
                text="비밀번호"
                onChangeInput={onChangeInput}
              />
              {passwordInvalidNotice && <ErrorNotice text="필수 입력 항목입니다" />}
              <StyledNotice isInvalidNotice={passwordInvalid && isClicked}>
                {SIGNUP_PLACEHOLDER['PASSWORD']}
              </StyledNotice>
            </StyledInputWrap>
          </StyledArea>
          <StyledArea>
            <StyledInputWrap>
              <InputText
                ref={elRef}
                type="text"
                isInValid={emailInvalid || emailInvalidNotice}
                value={email}
                name="email"
                text="이메일"
                onChangeInput={onChangeInput}
              />
              {emailInvalidNotice && <ErrorNotice text="필수 입력 항목입니다" />}
              <StyledNotice isInvalidNotice={emailInvalid && isClicked}>
                {SIGNUP_PLACEHOLDER['EMAIL']}
              </StyledNotice>
            </StyledInputWrap>
          </StyledArea>
          <StyledArea>
            <StyledInputWrap>
              <InputText
                ref={elRef}
                type="text"
                isInValid={phoneNumberInvalid || phoneNumberInvalidNotice}
                value={phoneNumber}
                name="phoneNumber"
                text="전화번호"
                onChangeInput={onChangeInput}
              />
              {phoneNumberInvalidNotice && <ErrorNotice text="필수 입력 항목입니다" />}
              <StyledNotice isInvalidNotice={phoneNumberInvalid && isClicked}>
                {SIGNUP_PLACEHOLDER['PHONENUMBER']}
              </StyledNotice>
            </StyledInputWrap>
          </StyledArea>

          <StyledCommonFlexContainer align="center">
            <StyledCommonPositiveButton isPositive={isCompleted} onClick={handleSubmit}>
              회원가입
            </StyledCommonPositiveButton>
          </StyledCommonFlexContainer>
        </StyledSignupWrap>
      </StyledCommonWrap>
    </>
  );
};

const StyledArea = styled.div`
  margin-bottom: 20px;
`;

const StyledSignupWrap = styled.article`
  max-width: 400px;
  margin: 0 auto;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledNotice = styled.p<{ isInvalidNotice: boolean }>`
  margin: 8px 4px;
  font-size: 12px;
  color: ${({ isInvalidNotice }) => (isInvalidNotice ? `${colors.warning}` : `${colors.gray1}`)};
`;

const StyledInputWrap = styled.div`
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
`;

SignUp.displayName = 'signUp';

export default SignUp;
