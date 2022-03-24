export const ID_VALIDATION = /^[A-Za-z0-9]{5,15}$/;

export const PW_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/g;

export const DOMAIN_VALIDATION = /[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

export const EMAIL_VALIDATION = /[0-9a-zA-Z]([-_\.]?[\w])/g;

export const DIGIT_VALIDATION = /^01([0|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

export const EMAIL_DOMAINS = [
  { domain: '', value: '직접입력' },
  { domain: 'gmail', value: 'gmail.com' },
  { domain: 'naver', value: 'naver.com' },
  { domain: 'kakao', value: 'kakao.com' },
];

export const DIGITS = ['010', '011', '016', '017', '018', '019'];
