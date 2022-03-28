export type QueryStringParams = { [key: string]: string | number | boolean };

export const PERMISSIONS = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
  NONE: 'NONE',
} as const;

export type PERMISSION_TYPE = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const PERMISSION_KIND = [PERMISSIONS.ADMIN, PERMISSIONS.MANAGER, PERMISSIONS.USER];

export const ERROR_SIGNUP = {
  PERMISSION: 'PERMISSION',
  ID: 'ID',
  PW: 'PW',
  DIGIT: 'DIGIT',
  EMAIL: 'EMAIL',
} as const;

export type ERROR_SIGNUP_TYPE = typeof ERROR_SIGNUP[keyof typeof ERROR_SIGNUP];

export const SIGNUP_PLACEHOLDER = {
  [ERROR_SIGNUP.PERMISSION]: '권한을 선택해주세요.',
  [ERROR_SIGNUP.ID]: '5자 이상 15자 이하 영문+숫자만 가능합니다.',
  [ERROR_SIGNUP.PW]: '최소8자 특수문자, 대문자, 숫자를 각각 최소 1개 이상 포함하여야 합니다.',
  [ERROR_SIGNUP.DIGIT]: `"-" 제외 숫자만 입력해주세요.`,
  [ERROR_SIGNUP.EMAIL]: `특수문자는 '_', '.' 만 포함 가능합니다`,
} as const;
