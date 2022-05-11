import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import {
  passwordValidates,
  userNameValidates,
} from "../signUp/utilites/inputValidation";
import axios from "axios";
import { isSuccess } from "../utilites/validates/httpValidation";

export default function LogIn() {
  const [userLogInData, setUserLogInData] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const onChangeUserId = (e) => {
    setUserLogInData({ ...userLogInData, username: e.currentTarget.value });
  };

  const onChangePassword = (e) => {
    setUserLogInData({ ...userLogInData, password: e.currentTarget.value });
  };

  const validateUserName = (value) => {
    let result = "";
    if (!userNameValidates[0].validation(value)) {
      result = userNameValidates[0].errorMessage;
    } else {
      return result;
    }
    return result;
  };

  const validatePassword = (value) => {
    let result = "";
    if (!passwordValidates[0].validation(value)) {
      result = passwordValidates[0].errorMessage;
    } else {
      return result;
    }
    return result;
  };

  const isValid = () => {
    const usernameErrorMessage = validateUserName(userLogInData.username);
    setUsernameErrorMessage(usernameErrorMessage);
    const passwordErrorMessage = validatePassword(userLogInData.password);
    setPasswordErrorMessage(passwordErrorMessage);
    return isEmpty(usernameErrorMessage) && isEmpty(passwordErrorMessage);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isValid()) {
        alert("모든 값을 제대로 입력해주세요.");
        return;
      }
      const res = await axios.post(
        "/api/v1/authentication/sign-in",
        userLogInData,
      );
      if (isSuccess(res)) {
        alert(res.data.message);
        return;
      }
      alert("로그인되었습니다.");
      history.replace("/articles");
    } catch (error) {
      alert("다시 한번 시도해주세요.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>로그인</h1>
      <div>
        <h3>아이디</h3>
        <input
          type="text"
          onChange={onChangeUserId}
          onFocus={() => {
            setUsernameErrorMessage("");
          }}
          placeholder="아이디"
        />
        {!isEmpty(usernameErrorMessage) && <p>{usernameErrorMessage}</p>}
      </div>
      <div>
        <h3>비밀번호</h3>
        <input
          type="password"
          onChange={onChangePassword}
          onFocus={() => {
            setPasswordErrorMessage("");
          }}
          placeholder="비밀번호"
        />
        {!isEmpty(passwordErrorMessage) && <p>{passwordErrorMessage}</p>}
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}
