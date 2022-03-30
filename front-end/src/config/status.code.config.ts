export const SUCCESS_STATUS_CODE = 'SUCCESS';
export const FAILURE_STATUS_CODE = 'FAILURE';

type STATUS_TYPE = 'SUCCESS' | 'FAILURE';

export const isSuccessStatus = (code: STATUS_TYPE) => {
  return code === SUCCESS_STATUS_CODE;
};

export const isFailureStatus = (code: STATUS_TYPE) => {
  return code === FAILURE_STATUS_CODE;
};
