import React, { useReducer, useContext, createContext } from 'react';
import { reducer, SignupDispatch } from '../reduce/signupReducer';
import { PERMISSION_TYPE, PERMISSIONS } from '../constants';

export interface InitialStateSignupInputType {
  permission: PERMISSION_TYPE;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export type InitialStateSignupType = {
  input: InitialStateSignupInputType;
  valid: { [key: string]: boolean };
};

const SignupStateContext = createContext<InitialStateSignupType | null>(null);
const SignupDispatchContext = createContext<SignupDispatch | null>(null);

export const initialState = {
  input: {
    username: '',
    password: '',
    phoneNumber: '',
    email: '',
    permission: PERMISSIONS.NONE,
  },
  valid: {
    username: false,
    password: false,
    phoneNumber: false,
    email: false,
    permission: false,
  },
};

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SignupStateContext.Provider value={state}>
      <SignupDispatchContext.Provider value={dispatch}>{children}</SignupDispatchContext.Provider>
    </SignupStateContext.Provider>
  );
};

export const useSignupState = () => {
  const state = useContext(SignupStateContext);
  if (!state) throw new Error('Cannot find SignupProvier');
  return state;
};

export const useSignupDispatch = () => {
  const dispatch = useContext(SignupDispatchContext);
  if (!dispatch) throw new Error('Cannot find SignupProvier');
  return dispatch;
};
