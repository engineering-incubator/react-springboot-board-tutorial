import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "../utilites/typeGuard/typeGuard";
import {
  passwordValidates,
  userNameValidates,
} from "../signUp/utilites/inputValidation";
import { isSuccess } from "../utilites/validates/httpValidation";
import { useProvideAuth } from "../context/useProvideAuth";
import { signInService } from "../services/authenticationServices";

export default function LogIn() {
  const history = useHistory();
  const auth = useProvideAuth();
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [userLogInData, setUserLogInData] = useState({
    username: "",
    password: "",
  });

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
    if (!isValid()) {
      alert("모든 값을 제대로 입력해주세요.");
      return;
    }
    const response = await signInService(userLogInData);

    if (!isSuccess(response)) {
      alert(response.data.message);
      return;
    }
    auth.test(response.data);
    alert("로그인되었습니다.");
    history.replace("/articles");
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
