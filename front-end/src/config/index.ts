export const USERNAME_VALIDATION = /^[A-Za-z0-9]{5,15}$/;

export const PASSWORD_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/g;

export const EMAIL_VALIDATION = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const PHONENUMBER_VALIDATION = /^01([0|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

export const API_URLS = {
  SIGNUP: '/v1/authentication/sign-up',
};
