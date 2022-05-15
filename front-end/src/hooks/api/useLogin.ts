import React from 'react';
import { queryClient } from '../../App';
import { loginRequest } from '../../api';

const cacheKey = 'loginCheck';

export interface LoginDataType {
  username: string;
  password: string;
}

const useLogin = () => {
  return {
    requstLogin: async (params: LoginDataType) => {
      return await queryClient.fetchQuery([cacheKey, params], () => loginRequest({ ...params }), {
        cacheTime: Infinity,
        staleTime: Infinity,
      });
    },
  };
};

export default useLogin;
