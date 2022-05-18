import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import {
  StyledCommonWrap,
  StyledCommonInputWrap,
  StyledCommonPositiveButton,
  StyledCommonToastContainer,
  StyledCommonClosePopup,
} from '../styles/common';
import useLogin from '../hooks/api/useLogin';
import { isSuccessStatus } from '../config/status.code.config';
import InputText, { focusRef } from '../components/common/InputText';
import ErrorNotice from '../components/common/ErrorNotice';
import Loading from '../components/common/Loading';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const { requstLogin } = useLogin();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState({
    username: '',
    password: '',
  });
  const passwordRef = useRef<focusRef>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setText((currVal) => ({
      ...currVal,
      [name]: value,
    }));
  };
  const isExistEmptyField = !!Object.entries(text).filter((i) => !i[1]).length;

  // NOTE onClick이 keydown에도 타는건가..!?
  const onClickLogin = () => {
    if (isExistEmptyField) {
      setIsValid(false);
      return;
    }

    (async () => {
      setIsLoading(true);
      const { code } = await requstLogin(text);
      const isSuccess = isSuccessStatus(code);

      const CloseButton = ({ closeToast }: { closeToast: () => void }) => {
        const onClickClose = () => {
          if (isSuccess) {
            window.location.href = '/articles';
          }
          setIsLoading(false);
          closeToast();
        };
        return <StyledCommonClosePopup onClick={onClickClose}>X</StyledCommonClosePopup>;
      };

      const toastOptions: ToastOptions = {
        position: 'top-center',
        theme: 'dark',
      };

      if (!isSuccess) {
        toast.error('로그인에 실패하였습니다.\n아이디, 패스워드를 확인해주세요.', {
          ...toastOptions,
          autoClose: 2000,
          closeButton: CloseButton,
        });
        setTimeout(() => setIsLoading(false), 2000);
        setIsValid(false);
        return;
      }

      toast.success('로그인에 성공하였습니다.\n잠시후 게시판으로 이동 합니다.', {
        ...toastOptions,
        autoClose: 2000,
        onClose: () => (window.location.href = '/articles'),
        closeButton: CloseButton,
      });
      setIsValid(true);
      setTimeout(() => setIsLoading(false), 2000);
    })();
  };

  const onKeydownLogin = (e: React.KeyboardEvent) => {
    const { code } = e;
    console.log(code);
    if (code === 'Enter' && isLoading) return null;
    console.log('?', isLoading);
    onClickLogin();
  };

  return (
    <>
      {isLoading && <Loading isFull={true} msg={'로그인 중입니다. 잠시만 기다려주십시오.'} />}
      <StyledCommonToastContainer />
      <StyledCommonWrap>
        <StyledCommonInputWrap>
          <InputText
            type="text"
            isInValid={false}
            value={text.username}
            name="username"
            text="아이디"
            onChangeInput={onChangeInput}
          />
        </StyledCommonInputWrap>
        <br />
        <StyledCommonInputWrap>
          <InputText
            ref={passwordRef}
            type="password"
            isInValid={false}
            value={text.password}
            name="password"
            text="페스워드"
            onChangeInput={onChangeInput}
          />
        </StyledCommonInputWrap>
        {!isValid && (
          <StyledNotice>
            <ErrorNotice text="아이디, 패스워드를 확인해주세요." />
          </StyledNotice>
        )}
        <StyledButton
          isPositive={!isExistEmptyField}
          disabled={isExistEmptyField}
          onClick={onClickLogin}
          onKeyDown={(e) => onKeydownLogin(e)}>
          로그인
        </StyledButton>
      </StyledCommonWrap>
    </>
  );
};

const StyledNotice = styled.div`
  padding-top: 20px;
`;

const StyledButton = styled(StyledCommonPositiveButton)`
  width: 100%;
  margin-top: 30px;
`;

export default Signin;
