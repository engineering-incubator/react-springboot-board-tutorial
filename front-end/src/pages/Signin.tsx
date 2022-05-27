import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
  StyledCommonWrap,
  StyledCommonTitle,
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
import { useSetRecoilState } from 'recoil';
import { whoamiState } from '../recoil/signin';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const { requstLogin } = useLogin();
  const setLoginStatus = useSetRecoilState(whoamiState);
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const passwordRef = useRef<focusRef>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setUserInfo((currVal) => ({
      ...currVal,
      [name]: value,
    }));
  };
  const isExistEmptyField = !!Object.entries(userInfo).filter((i) => !i[1]).length;

  // NOTE onClick이 keydown에도 타는건가..!?
  const onClickLogin = () => {
    if (isExistEmptyField) {
      setIsValid(false);
      return;
    }

    (async () => {
      setIsLoading(true);
      const { code, content } = await requstLogin(userInfo);
      const isSuccess = isSuccessStatus(code);

      const CloseButton = ({ closeToast }: { closeToast: () => void }) => {
        const onClickClose = () => {
          if (isSuccess) {
            navigate('/articles');
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

      setLoginStatus({
        isSignin: true,
        username: content.username,
        permission: content.permission,
      });

      toast.success('로그인에 성공하였습니다.\n잠시후 게시판으로 이동 합니다.', {
        ...toastOptions,
        autoClose: 2000,
        onClose: () => navigate('/articles'),
        closeButton: CloseButton,
      });
      setIsValid(true);
      setTimeout(() => setIsLoading(false), 2000);
    })();
  };

  // FIXME keydown event를 막을 방법은..
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
        <StyledCommonTitle>로그인</StyledCommonTitle>
        <StyledCommonInputWrap>
          <InputText
            type="text"
            isInValid={false}
            value={userInfo.username}
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
            value={userInfo.password}
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
          // onKeyDown={(e) => onKeydownLogin(e)}
        >
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
