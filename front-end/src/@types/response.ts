import { SUCCESS_STATUS_CODE, FAILURE_STATUS_CODE } from '../config/status.code.config';

type responseCode = typeof SUCCESS_STATUS_CODE | typeof FAILURE_STATUS_CODE;
export interface ExternalResponseSuccess<T> {
  code: responseCode;
  content: T;
  message: string;
}

export interface ExternalResponseFailure<T> {
  code: responseCode;
  content: T;
  message: string;
}

export type ExternalResponse<T> = ExternalResponseSuccess<T> | ExternalResponseFailure<T>;
