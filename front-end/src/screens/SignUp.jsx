import React, { useReducer } from "react";
import Button from "../components/common/Button";
import AuthTemplate from "../components/auth/AuthTemplate";
import Input from "../components/common/Input";
import ErrorMessage from "../components/common/ErrorMessage";
import Selection from "../components/common/Selection";
import { isPassword, isEmail, isPhoneNumber } from "../validation/SignUpRegEx";
const PERMISSIONS = [
	{ value: "admin", name: "admin" },
	{ value: "manager", name: "manager" },
	{ value: "user", name: "user" },
];
const reducer = (state, action) => {
	return {
		...state,
		[action.name]: action.value,
	};
};

const SignUp = () => {
	const [state, dispatch] = useReducer(reducer, {
		id: "",
		password: "",
		passwordConfirm: "",
		email: "",
		phoneNumber: "",
	});
	const onChange = (e) => {
		dispatch(e.target);
		console.log(state);
	};

	return (
		<>
			<AuthTemplate title="회원가입">
				<Input placeholder="아이디" name="id" onChange={onChange} />
				<Input placeholder="비밀번호" name="password" onChange={onChange} />
				{!isPassword(state.password) && (
					<ErrorMessage>
						8 ~ 16자 영문, 숫자 조합으로 비밀번호를 설정해주세요.
					</ErrorMessage>
				)}
				<Input
					placeholder="비밀번호 확인"
					name="passwordConfirm"
					onChange={onChange}
				/>
				{state.password !== state.passwordConfirm && (
					<ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>
				)}
				권한<Selection options={PERMISSIONS} onChange={onChange}></Selection>
				<Input placeholder="이메일" name="email" onChange={onChange} />
				{!isEmail(state.email) && (
					<ErrorMessage>example@example.com 형식으로 입력해주세요</ErrorMessage>
				)}
				<Input placeholder="전화번호" name="phoneNumber" onChange={onChange} />
				{!isPhoneNumber(state.phoneNumber) && (
					<ErrorMessage>000-0000-0000 형식으로 입력해주세요.</ErrorMessage>
				)}
				<Button>완료</Button>
			</AuthTemplate>
		</>
	);
};
export default SignUp;
