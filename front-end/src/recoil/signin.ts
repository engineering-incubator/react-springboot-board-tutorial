import { atom } from 'recoil';

interface SigninType {
  isSignin: boolean;
  username: string;
}

export const signinState = atom<SigninType>({
  key: 'signinState',
  default: {
    isSignin: false,
    username: '',
  },
});
