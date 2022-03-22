import {
  ID_VALIDATION,
  PW_VALIDATION,
  EMAIL_VALIDATION,
  DOMAIN_VALIDATION,
  DIGIT_VALIDATION,
} from '_/config';

export const inputValidation = (value: string, regType: RegExp) => new RegExp(regType).test(value);

export type typeValidation = 'id' | 'pw' | 'digit' | 'email' | 'domain';

export const getValidationReg = (type: typeValidation) => {
  const typeName = type.toUpperCase();
  return {
    ID: ID_VALIDATION,
    PW: PW_VALIDATION,
    DIGIT: DIGIT_VALIDATION,
    EMAIL: EMAIL_VALIDATION,
    DOMAIN: DOMAIN_VALIDATION,
  }[typeName];
};
