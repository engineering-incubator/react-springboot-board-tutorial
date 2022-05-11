export const USERNAME_VALIDATION = /^[A-Za-z0-9]{5,15}$/;

export const PASSWORD_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/g;

export const EMAIL_VALIDATION = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const PHONENUMBER_VALIDATION = /^01([0|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;

export const API_URLS = {
  SIGNUP: '/v1/authentication/sign-up',
  ARTICLES: '/v1/articles',
};

export const LANDING_PATH_NAME = {
  ARTICLES: 'ARTICLES',
  ARTICLE: 'ARTICLE',
  ARTICLE_WRITE: 'ARTICLE_WRITE',
  SIGNUP: 'SIGNUP',
} as const;
export type LANDING_PATH_NAME_TYPE = typeof LANDING_PATH_NAME[keyof typeof LANDING_PATH_NAME];

export const LANDING_PATH = {
  ARTICLES: '/articles',
  ARTICLE: '/article',
  ARTICLE_WRITE: '/article/write',
  SIGNUP: '/signup',
} as const;
export type LANDING_PATH_TYPE = typeof LANDING_PATH[keyof typeof LANDING_PATH];
