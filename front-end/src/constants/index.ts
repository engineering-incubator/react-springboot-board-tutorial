export const ID_VALIDATION = /^[A-Za-z0-9]{5,15}$/;
export const PW_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/g;

export const DOMAIN_VALIDATION = /[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

export const EMAIL_VALIDATION = /^[a-zA-Z0-9]*$/;

export const DIGIT_FIRST_VALID = /[0-9]{3}/g;
export const DIGIT_SECOND_VALID = /[0-9]{3, 4}/g;
export const DIGIT_THIRD_VALID = /[0-9]{4}/g;

export const EMAIL_DOMAINS = [
  { domain: 'gmail', value: 'gmail.com' },
  { domain: 'naver', value: 'naver.com' },
  { domain: 'kakao', value: 'kakao.com' },
];

export const DIGITS = ['010', '011', '016', '017', '018', '019'];
