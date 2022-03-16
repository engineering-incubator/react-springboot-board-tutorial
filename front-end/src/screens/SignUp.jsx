import React from "react";
import Button from "../components/common/Button";
import AuthTemplate from "../components/auth/AuthTemplate";
import Input from "../components/common/Input";
import Selection from "../components/common/Selection";

const PERMISSIONS = [
	{ value: "admin", name: "admin" },
	{ value: "manager", name: "manager" },
	{ value: "user", name: "user" },
];

const SignUp = () => {
	return (
		<>
			<AuthTemplate title="회원가입">
				<Input placeholder="아이디" name="id" />
				<Input placeholder="비밀번호" name="password" />
				<Input placeholder="비밀번호 확인" name="passwordConfirm" />
				권한<Selection options={PERMISSIONS}></Selection>
				<Input placeholder="이메일" name="email" />
				<Input placeholder="전화번호" name="phone" />
				<Button>완료</Button>
			</AuthTemplate>
		</>
	);
};
export default SignUp;
