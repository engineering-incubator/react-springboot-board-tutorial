import React, { useReducer, useState } from 'react'
import Button from '../../components/common/Button'
import Template from '../../components/common/Template'
import Input from '../../components/common/Input'
import ErrorMessage from '../../components/common/ErrorMessage'
import Select from '../../components/common/Select'
import {
  isPasswordPattern,
  isEmailPattern,
  isPhoneNumberPattern,
} from '../../validation/SignUpRegEx'
import { register } from '../../api/authApi'

const PERMISSIONS = [
  { value: 'ADMIN', name: 'admin' },
  { value: 'MANAGER', name: 'manager' },
  { value: 'USER', name: 'user' },
]
const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  }
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
    const result = await register(state)
    if (result.code === 'SUCCESS') console.log('회원가입 완료')
    else {
			if (result.message === '이미 가입된 아이디입니다.')
				console.log("회원가입 실패: 이미 가입된 아이디입니다.")
    }
  }
  return (
    <>
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
