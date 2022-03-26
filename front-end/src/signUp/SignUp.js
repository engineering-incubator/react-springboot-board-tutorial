import React, { useRef, useState } from "react";
import SignUpForm from "./components/signUpForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const formRef = useRef();
  const history = useHistory();
  const [userSignUpData, setUserSignUpData] = useState({
    permission: "",
    username: "martin",
    password: "dudgns123!",
    passwordConfirm: "dudgns123!",
    email: "tarry24@naver.com",
    phoneNumber: "010-1234-1234",
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
      const res = await axios.post("/api", submitUserSignUpData);
      if (res.data.code !== "SUCCESS") {
        alert(res.data.message);
        return;
      }
      alert("회원가입을 완료되었습니다.");
      history.push("/login");
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
