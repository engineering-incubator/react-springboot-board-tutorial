import React, { useRef, useState } from "react";
import SignUpForm from "./components/signUpForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const formRef = useRef();
  const history = useHistory();
  const [userSignUpData, setUserSignUpData] = useState({
    permission: "USER",
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    phoneNumber: "",
  });

  const onChangeUserData = (type, value) => {
    setUserSignUpData({ ...userSignUpData, [type]: value });
  };

  const submitRes = async (e) => {
    e.preventDefault();
    try {
      const { passwordConfirm, ...submitUserSignUpData } = userSignUpData;
      if (!formRef.current.isValid()) {
        alert("모든 값을 입력하세요.");
        return;
      }
      const res = await axios.post(
        "/api/v1/authentication/sign-up",
        submitUserSignUpData,
      );
      if (res.data.code !== "SUCCESS") {
        alert(res.data.message);
        return;
      }
      history.replace("/login");
      alert("고객님, 환영합니다!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitRes}>
      <h1>회원가입</h1>
      <SignUpForm
        ref={formRef}
        onChangeUserData={onChangeUserData}
        userSignUpData={userSignUpData}
      />
      <button type="submit">가입하기</button>
    </form>
  );
}
