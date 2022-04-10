import React, { useMemo, useReducer, useState } from "react";
import { register } from "../../api/authApi";
import { isFailureStatus } from "../../api/config/status-code.config";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Template from "../../components/common/Template";
import { isEmailPattern, isPasswordPattern, isPhoneNumberPattern } from "../../validation/SignUpRegEx";

const PERMISSIONS = [
  { value: 'ADMIN', name: 'admin' },
  { value: 'MANAGER', name: 'manager' },
  { value: 'USER', name: 'user' },
]
const reducer = (state, action) => {
  // TODO reducer 의 철학에 위배 되는 듯 하다.. Plain object 형태를 넣어줘야 할듯 하다. DOM 을 넣는 건 쫌......
  return {
    ...state,
    [action.name]: action.value,
  }
}

export function isEmpty(value) {
  return !value;
}


const SignUp = () => {
  const [isClickSubmitButton, setIsClickSubmitButton] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    username: null,
    password: null,
    passwordConfirm: null,
    permission: 'ADMIN',
    email: null,
    phoneNumber: null,
  })
  const {
    username,
    password,
    passwordConfirm,
    permission,
    email,
    phoneNumber,
  } = state

  const requestRegister = async () => {
    // FIXME validation 통과하지 못했을 경우, 서버로 요청을 하지 말아야 함.
    const result = await register(state)
    if (isFailureStatus(result.code)) {
      return alert(result.message);
    }

    alert('회원가입 완료되었습니다.')
    document.location.href = '/signIn'
  }

  return (
		<>
      {/* FIXME component 추상화 */}
      <Template title="회원가입">
        <Input
          placeholder="아이디"
          name="username"
          onChange={(e) => dispatch(e.target)}
        />
        {isClickSubmitButton && !username && (
          <ErrorMessage>❕ 아이디를 입력해주세요</ErrorMessage>
        )}
        <Input
          placeholder="비밀번호"
          name="password"
          onChange={(e) => dispatch(e.target)}
        />
        {password && !isPasswordPattern(password) && (
          <ErrorMessage>
            💡 8 ~ 16자 영문, 숫자 조합으로 비밀번호를 설정해주세요.
          </ErrorMessage>
        )}
        {isClickSubmitButton && !password && (
          <ErrorMessage>❕ 비밀번호를 입력해주세요</ErrorMessage>
        )}
        <Input
          placeholder="비밀번호 확인"
          name="passwordConfirm"
          onChange={(e) => dispatch(e.target)}
        />
        {password !== passwordConfirm && (
          <ErrorMessage>💡 비밀번호가 다릅니다.</ErrorMessage>
        )}
        {isClickSubmitButton && !passwordConfirm && (
          <ErrorMessage>❕ 비밀번호 확인을 입력해주세요</ErrorMessage>
        )}
        권한
        <Select
          onChange={(e) => {
            dispatch(e.target)
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
        {email && !isEmailPattern(email) && (
          <ErrorMessage>
            💡 example@example.com 형식으로 입력해주세요
          </ErrorMessage>
        )}
        {isClickSubmitButton && !email && (
          <ErrorMessage>❕ 이메일을 입력해주세요</ErrorMessage>
        )}
        <Input
          placeholder="전화번호"
          name="phoneNumber"
          onChange={(e) => {
            dispatch(e.target)
            console.log(state)
          }}
        />
        {phoneNumber && !isPhoneNumberPattern(phoneNumber) && (
          <ErrorMessage>💡 000-0000-0000 형식으로 입력해주세요.</ErrorMessage>
        )}
        {isClickSubmitButton && !phoneNumber && (
          <ErrorMessage>❕ 전화번호를 입력해주세요</ErrorMessage>
        )}
        <Button
          onClick={() => {
            setIsClickSubmitButton(true)
            requestRegister()
          }}
        >
          완료
        </Button>
      </Template>
    </>
  )
}
export default SignUp
