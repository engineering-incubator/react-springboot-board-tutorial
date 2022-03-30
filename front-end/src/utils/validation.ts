import {
  USERNAME_VALIDATION,
  PASSWORD_VALIDATION,
  EMAIL_VALIDATION,
  PHONENUMBER_VALIDATION,
} from '_/config';

export const inputValidation = (value: string, regType: RegExp) => new RegExp(regType).test(value);

export type typeValidation = 'username' | 'password' | 'phoneNumber' | 'email';

export const getValidationReg = (type: typeValidation) => {
  const typeName = type.toUpperCase();
  return {
    USERNAME: USERNAME_VALIDATION,
    PASSWORD: PASSWORD_VALIDATION,
    PHONENUMBER: PHONENUMBER_VALIDATION,
    EMAIL: EMAIL_VALIDATION,
  }[typeName];
};
