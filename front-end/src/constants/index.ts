export const ID_VALIDATION = /^[a-zA-Z0-9]{5,15}$/g;
export const PW_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/g;

export const DOMAIN_VALIDATION = /[A-Z0-9.-]+$/i;

export const EMAIL_VALIDATION = /\b[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*/g;

export const EMAIL_DOMAINS = [
  { domain: 'gmail', value: 'gmail.com' },
  { domain: 'naver', value: 'naver.com' },
  { domain: 'kakao', value: 'kakao.com' },
];
