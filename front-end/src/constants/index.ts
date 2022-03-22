export const EMAIL_DOMAINS = [
  { domain: 'gmail', value: 'gmail.com' },
  { domain: 'naver', value: 'naver.com' },
  { domain: 'kakao', value: 'kakao.com' },
];

export const DIGITS = ['010', '011', '016', '017', '018', '019'];

export type QueryStringParams = { [key: string]: string | number | boolean };

export const PERMISSION_TYPE = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
  NONE: 'NONE',
} as const;

export type PERMISSION_TYPE = typeof PERMISSION_TYPE[keyof typeof PERMISSION_TYPE];

export const PERMISSION_KIND = [
  PERMISSION_TYPE.ADMIN,
  PERMISSION_TYPE.MANAGER,
  PERMISSION_TYPE.USER,
];
