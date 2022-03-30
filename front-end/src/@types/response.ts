export interface ExternalResponseSuccess<T> {
  data: T;
}

export interface ExternalResponseFailure<T> {
  data: T;
}

export type ExternalResponse<T> = ExternalResponseSuccess<T> | ExternalResponseFailure<T>;
