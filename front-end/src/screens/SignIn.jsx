import React from "react";
import Button from "../components/common/Button";
import AuthTemplate from "../components/auth/AuthTemplate";
import Input from "../components/common/Input";

const SignIn = () => {
	return (
		<>
			<AuthTemplate title="로그인">
				<Input placeholder="아이디" name="id" />
				<Input placeholder="비밀번호" name="password" />
				<Button>로그인</Button>
			</AuthTemplate>
		</>
	);
};
export default SignIn;
