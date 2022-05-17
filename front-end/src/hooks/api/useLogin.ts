import React from 'react';
import { useQueryClient } from 'react-query';
import { loginRequest } from '../../api';

const cacheKey = 'loginCheck';

export interface LoginDataType {
  username: string;
  password: string;
}

const useLogin = () => {
  const queryClient = useQueryClient();
  return {
    requstLogin: async (params: LoginDataType) =>
      await queryClient.fetchQuery([cacheKey, params], () => loginRequest(params), {
        cacheTime: Infinity,
        staleTime: Infinity,
      }),
  };
};

export default useLogin;
