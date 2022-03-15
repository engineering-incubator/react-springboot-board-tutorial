import { ID_VALIDATION, PW_VALIDATION, DOMAIN_VALIDATION, DIGIT_VALIDATION } from '_/constants';

export const inputValidation = (value: string, regType: RegExp) => new RegExp(regType).test(value);

export type typeValidation = 'id' | 'pw' | 'digit' | 'email' | 'domain';

export const getValidationReg = (type: typeValidation) => {
  const typeName = type.toUpperCase();
  return {
    ID: ID_VALIDATION,
    PW: PW_VALIDATION,
    DIGIT: DIGIT_VALIDATION,
    EMAIL: DOMAIN_VALIDATION,
    DOMAIN: DOMAIN_VALIDATION,
  }[typeName];
};
