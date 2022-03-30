const SUCCESS_STATUS_CODE = "SUCCESS";
const FAILURE_STATUS_CODE = "FAILURE";

export function isSuccessStatus(code) {
  return code === SUCCESS_STATUS_CODE;
}

export function isFailureStatus(code) {
  return code === FAILURE_STATUS_CODE;
}