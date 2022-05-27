import { useQueryClient } from 'react-query';
import { loginRequest, whoamiRequest } from '../../api';

const cacheKey = 'whoami';

export interface LoginParamsType {
  username: string;
  password: string;
}
export interface LoginResponseType {
  username: string;
  permission: string;
}

const useLogin = () => {
  const queryClient = useQueryClient();
  return {
    requstLogin: async (params: LoginParamsType) =>
      await queryClient.fetchQuery([cacheKey, params], () => loginRequest(params), {
        cacheTime: Infinity,
        staleTime: Infinity,
      }),

    requestWhoami: async () => {
      await queryClient.fetchQuery(['whoami'], () => whoamiRequest(), {
        cacheTime: Infinity,
        staleTime: Infinity,
      });
    },
  };
};

export default useLogin;
