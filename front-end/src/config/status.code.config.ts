export const SUCCESS_STATUS_CODE = 'SUCCESS' as const;
export const FAILURE_STATUS_CODE = 'FAILURE' as const;

export type STATUS_TYPE = 'SUCCESS' | 'FAILURE';

export const isSuccessStatus = (code: STATUS_TYPE) => {
  return code === SUCCESS_STATUS_CODE;
};

export const isFailureStatus = (code: STATUS_TYPE) => {
  return code === FAILURE_STATUS_CODE;
};
