import React, { useReducer } from "react";
import Button from "../components/common/Button";
import AuthTemplate from "../components/auth/AuthTemplate";
import Input from "../components/common/Input";
import ErrorMessage from "../components/common/ErrorMessage";
import Select from "../components/common/Select";
import { isPassword, isEmail, isPhoneNumber } from "../validation/SignUpRegEx";
import { signUp } from "../api/authApi";

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
		permission: "",
		email: "",
		phoneNumber: "",
	});
	const { id, password, passwordConfirm, permission, email, phoneNumber } =
		state;

	return (
		<>
			<AuthTemplate title="회원가입">
				<Input
					placeholder="아이디"
					name="id"
					onChange={(e) => dispatch(e.target)}
				/>
				<Input
					placeholder="비밀번호"
					name="password"
					onChange={(e) => dispatch(e.target)}
				/>
				{password && !isPassword(password) && (
					<ErrorMessage>
						💡 8 ~ 16자 영문, 숫자 조합으로 비밀번호를 설정해주세요.
					</ErrorMessage>
				)}
				<Input
					placeholder="비밀번호 확인"
					name="passwordConfirm"
					onChange={(e) => dispatch(e.target)}
				/>
				{password !== passwordConfirm && (
					<ErrorMessage>💡 비밀번호가 다릅니다.</ErrorMessage>
				)}
				권한
				<Select
					onChange={(e) => {
						dispatch(e.target);
					}}
					name="permission"
				>
					{PERMISSIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.name}
						</option>
					))}
				</Select>
				<Input
					placeholder="이메일"
					name="email"
					onChange={(e) => dispatch(e.target)}
				/>
				{email && !isEmail(email) && (
					<ErrorMessage>
						💡 example@example.com 형식으로 입력해주세요
					</ErrorMessage>
				)}
				<Input
					placeholder="전화번호"
					name="phoneNumber"
					onChange={(e) => {
						dispatch(e.target);
						console.log(state);
					}}
				/>
				{phoneNumber && !isPhoneNumber(phoneNumber) && (
					<ErrorMessage>💡 000-0000-0000 형식으로 입력해주세요.</ErrorMessage>
				)}
				<Button
					onClick={async () => {
						await signUp(email, id, password, permission, phoneNumber);
					}}
				>
					완료
				</Button>
			</AuthTemplate>
		</>
	);
};
export default SignUp;
