import React from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Template from "../../components/common/Template";

const SignIn = () => {
	// TODO validation 추가 되어야하고, 그렇다면 sign up 과 어떻게 같이 사용할건지에 대한 고민
	return (
		<>
			<Template title="로그인">
				<Input placeholder="아이디" name="id" />
				<Input placeholder="비밀번호" name="password" />
				<Button>로그인</Button>
			</Template>
		</>
	);
};
export default SignIn;
