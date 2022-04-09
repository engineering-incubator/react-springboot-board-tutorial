import { isEqual, required } from "../../utilites/validates/utilityValidations";
import {
  email,
  password,
  phoneNumber,
  userName,
} from "../../utilites/validates/rules/userValidationsRules";

// TODO 분리 여부 정하기

export const userNameValidates = [
  {
    validation: required,
    errorMessage: "아이디를 입력해주세요.",
  },
  {
    validation: userName,
    errorMessage: "영문자+3글자 이상이어야 합니다.",
  },
];

export function validateUserName(value) {
  let result = "";
  userNameValidates.every((validate) => {
    const isValid = validate.validation(value);
    if (!isValid) {
      result = validate.errorMessage;
    }
    return isValid;
  });
  return result;
}

export const passwordValidates = [
  {
    validation: required,
    errorMessage: "비밀번호를 입력해주세요.",
  },
  {
    validation: password,
    errorMessage: "영문자+특수문자+8자 이상이어야 합니다.",
  },
];

export function validatePassword(value) {
  let result = "";
  passwordValidates.every((validate) => {
    const isValid = validate.validation(value);
    if (!isValid) {
      result = validate.errorMessage;
    } else {
      result = "";
    }
    return isValid;
  });
  return result;
}

const passwordConfirmValidate = [
  {
    validation: isEqual,
    errorMessage: "비밀번호가 일치하지 않습니다.",
  },
];

export function validatePasswordConfirm(value, source) {
  let result = "";
  passwordConfirmValidate.every((validate) => {
    const isValid = validate.validation(value, source);
    if (!isValid) {
      result = validate.errorMessage;
    } else {
      result = "";
    }
    return result;
  });
  return result;
}

const emailValidates = [
  {
    validation: required,
    errorMessage: "이메일을 입력해주세요.",
  },
  {
    validation: email,
    errorMessage: "정확한 이메일을 입력해주세요.",
  },
];

export function validateEmail(value) {
  let result = "";
  emailValidates.every((validate) => {
    const isValid = validate.validation(value);
    if (!isValid) {
      result = validate.errorMessage;
    } else {
      result = "";
    }
    return isValid;
  });
  return result;
}

const phoneNumberValidates = [
  {
    validation: required,
    errorMessage: "휴대폰 번호를 입력해주세요.",
  },
  {
    validation: phoneNumber,
    errorMessage: "정확한 휴대폰 번호를 입력해주세요.",
  },
];

export function validatePhoneNumber(value) {
  let result = "";
  phoneNumberValidates.every((validate) => {
    const isValid = validate.validation(value);
    if (!isValid) {
      result = validate.errorMessage;
    } else {
      result = "";
    }
    return isValid;
  });
  return result;
}
