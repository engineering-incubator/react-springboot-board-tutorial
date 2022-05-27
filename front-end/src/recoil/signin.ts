import { atom } from 'recoil';

interface WhoamiType {
  isSignin: boolean;
  username: string;
  permission: string;
}

export const whoamiState = atom<WhoamiType>({
  key: 'whoamiState',
  default: {
    isSignin: false,
    username: '',
    permission: '',
  },
});
