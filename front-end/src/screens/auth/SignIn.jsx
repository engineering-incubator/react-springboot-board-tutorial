import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signInApi } from "../../api/authApi";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Template from "../../components/common/Template";

const SignIn = () => {
	const history = useHistory();
	// TODO validation 추가 되어야하고, 그렇다면 sign up 과 어떻게 같이 사용할건지에 대한 고민
	const [id, setId] = useState();
	const [password, setPassword] = useState();

	const signUpHandler = async () => {
		const response = await signInApi({
			username: id, password
		});
		if (!response.isSuccess) {
			return alert(response.message)
		}

		alert("로그인이 성공했습니다.")
		history.push("/");
	}

	return (
		<>
			<Template title="로그인">
				<Input placeholder="아이디" name="id" onChange={(e)=>setId(e.target.value)}/>
				<Input placeholder="비밀번호" name="password" onChange={(e)=>setPassword(e.target.value)}/>
				<Button onClick={signUpHandler}>로그인</Button>
			</Template>
		</>
	);
};
export default SignIn;
