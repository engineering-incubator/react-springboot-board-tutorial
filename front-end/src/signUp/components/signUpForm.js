import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validatePhoneNumber,
  validateUserName,
} from "../utilites/inputValidation";
import { isEmpty } from "../../utilites/typeGuard/typeGuard";
import { email } from "../../utilites/validates/rules/userValidationsRules";

export default React.forwardRef(function SignUpForm(
  { onChangeUserData, userSignUpData, submitValidationError },
  ref,
) {
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

  const onChangePermission = (e) => {
    onChangeUserData("permission", e.currentTarget.checked);
  };

  const onChangeUsername = (e) => {
    onChangeUserData("username", e.currentTarget.value);
    setUsernameErrorMessage(validateUserName(e.currentTarget.value));
  };

  const onChangePassword = (e) => {
    onChangeUserData("password", e.currentTarget.value);
    setPasswordErrorMessage(validatePassword(e.currentTarget.value));
  };

  const onChangePasswordConfirm = (e) => {
    onChangeUserData("passwordConfirm", e.currentTarget.value);
    setPasswordConfirmErrorMessage(
      validatePasswordConfirm(e.currentTarget.value, userSignUpData.password),
    );
  };

  const onChangeEmail = (e) => {
    onChangeUserData("email", e.currentTarget.value);
    setEmailErrorMessage(validateEmail(e.currentTarget.value));
  };

  const onChangePhoneNumber = (e) => {
    onChangeUserData("phoneNumber", e.currentTarget.value);
    setPhoneNumberErrorMessage(validatePhoneNumber(e.currentTarget.value));
  };

  useImperativeHandle(
    ref,
    () => ({
      isValid: () => {
        const usernameErrorMessage = validateUserName(userSignUpData.username);
        setUsernameErrorMessage(usernameErrorMessage);
        const passwordErrorMessage = validatePassword(userSignUpData.password);
        setPasswordErrorMessage(passwordErrorMessage);
        const passwordConfirmErrorMessage = validatePasswordConfirm(
          userSignUpData.password,
          userSignUpData.passwordConfirm,
        );
        setPasswordConfirmErrorMessage(passwordConfirmErrorMessage);
        const emailErrorMessage = validateEmail(userSignUpData.email);
        setEmailErrorMessage(emailErrorMessage);
        const phoneNumberErrorMessage = validatePhoneNumber(
          userSignUpData.phoneNumber,
        );
        setPhoneNumberErrorMessage(phoneNumberErrorMessage);

        return (
          isEmpty(usernameErrorMessage) &&
          isEmpty(passwordErrorMessage) &&
          isEmpty(passwordConfirmErrorMessage) &&
          isEmpty(emailErrorMessage) &&
          isEmpty(phoneNumberErrorMessage)
        );
      },
    }),
    [
      userSignUpData,
      usernameErrorMessage,
      passwordErrorMessage,
      passwordConfirmErrorMessage,
      emailErrorMessage,
      phoneNumberErrorMessage,
    ],
  );

  useEffect(() => {
    setPasswordConfirmErrorMessage(
      validatePasswordConfirm(
        userSignUpData.password,
        userSignUpData.passwordConfirm,
      ),
    );
  }, [userSignUpData.password, userSignUpData.passwordConfirm]);

  return (
    <>
      <div>
        <h5>계정유형</h5>
        <div>
          <label>
            <input
              type="radio"
              name="Permission"
              onChange={onChangePermission}
            />
            관리자
          </label>
          <label>
            <input
              type="radio"
              name="Permission"
              onChange={onChangePermission}
            />
            매니저
          </label>
          <label>
            <input
              checked
              type="radio"
              name="Permission"
              onChange={onChangePermission}
            />
            일반회원
          </label>
        </div>
      </div>
      <div>
        <h5>아이디</h5>
        <input
          type="text"
          name="username"
          value={userSignUpData.username}
          onChange={onChangeUsername}
        />
        {!isEmpty(usernameErrorMessage) && <p>{usernameErrorMessage}</p>}
      </div>
      <div>
        <h5>비밀번호</h5>
        <input
          type="password"
          value={userSignUpData.password}
          onChange={onChangePassword}
        />
        {!isEmpty(passwordErrorMessage) && <p>{passwordErrorMessage}</p>}
      </div>
      <div>
        <h5>비밀번호 확인</h5>
        <input
          type="password"
          value={userSignUpData.passwordConfirm}
          onChange={onChangePasswordConfirm}
        />
        {!isEmpty(passwordConfirmErrorMessage) && (
          <p>{passwordConfirmErrorMessage}</p>
        )}
      </div>
      <div>
        <h5>이메일</h5>
        <input
          type="email"
          name="email"
          value={userSignUpData.email}
          onChange={onChangeEmail}
        />
        {!isEmpty(emailErrorMessage) && <p>{emailErrorMessage}</p>}
      </div>
      <div>
        <h5>휴대폰 번호</h5>
        <input
          type="text"
          name="phoneNumber"
          value={userSignUpData.phoneNumber}
          onChange={onChangePhoneNumber}
        />
        {!isEmpty(phoneNumberErrorMessage) && <p>{phoneNumberErrorMessage}</p>}
      </div>
    </>
  );
});
