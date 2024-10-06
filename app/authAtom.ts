import { atom } from 'recoil';

export const authState = atom({
  key: 'authState', // 고유한 키
  default: {
    isLoggedIn: false,
    email: '',
  },
});
