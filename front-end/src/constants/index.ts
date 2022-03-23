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
  PERMISSIONS: 'PERMISSION',
  ID: 'ID',
  PW: 'PW',
  DIGIT: 'DIGIT',
  EMAIL: 'EMAIL',
} as const;

export type ERROR_SIGNUP_TYPE = typeof ERROR_SIGNUP[keyof typeof ERROR_SIGNUP];

export const ERROR_SIGNUP_TEXT = {
  PERMISSION: '셋중 하나를 선택해주세요.',
  ID: '아이디는 5자 이상 15자 이하 영문+숫자만 가능합니다.',
  PW: '패스워드는 최소8자 특수문자, 대문자, 숫자를 각각 최소 1개 포함하여야 합니다.',
  EMAIL: 'email 형식에 맞춰주세요',
  DIGIT: `전화번호는 "-" 제외 숫자만 입력해주세요.`,
} as const;
