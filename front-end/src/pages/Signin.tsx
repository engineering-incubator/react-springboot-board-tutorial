import React, { useState } from 'react';
import { StyledCommonWrap } from '../styles/common';
import useLogin from '../hooks/api/useLogin';

const Signin = () => {
  const { requstLogin } = useLogin();
  const [text, setText] = useState({
    username: '',
    password: '',
  });

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setText((currVal) => ({
      ...currVal,
      [name]: value,
    }));
  };

  const onClickLogin = async () => {
    const { code, message } = await requstLogin(text);
    console.log(code, message);
  };

  return (
    <StyledCommonWrap>
      <input
        type="text"
        name="username"
        defaultValue={text.username}
        placeholder="username"
        onChange={onChangeText}
      />
      <input
        type="password"
        name="password"
        defaultValue={text.password}
        placeholder="password"
        onChange={onChangeText}
      />
      <button type="button" onClick={onClickLogin}>
        submit
      </button>
    </StyledCommonWrap>
  );
};

export default Signin;
