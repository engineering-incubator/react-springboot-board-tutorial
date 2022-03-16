export const ID_VALIDATION = /^[A-Za-z0-9]{5,15}$/;
export const PW_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/g;

export const DOMAIN_VALIDATION = /[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

export const EMAIL_VALIDATION = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const DIGIT_VALIDATION = /[0-9]{3}-[0-9]{3,4}-[0-9]{4}/g;

export const EMAIL_DOMAINS = [
  { domain: 'gmail', value: 'gmail.com' },
  { domain: 'naver', value: 'naver.com' },
  { domain: 'kakao', value: 'kakao.com' },
];

export const DIGITS = ['010', '011', '016', '017', '018', '019'];

export type QueryStringParams = { [key: string]: string | number | boolean };

export const AXIOS_TYPE = {
  POST: 'post',
  DELETE: 'delete',
  OPTIONS: 'options',
  HEAD: 'head',
} as const;
export type AXIOS_TYPE = typeof AXIOS_TYPE[keyof typeof AXIOS_TYPE];
