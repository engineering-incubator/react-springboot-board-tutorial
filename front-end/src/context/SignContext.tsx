import React, { useReducer, useContext, createContext } from 'react';
import { reducer, StateType, SignupDispatch } from '_/reduce/signupReducer';
import { PERMISSION_TYPE, PERMISSIONS } from '_/constants';

export interface InitialStateType {
  input: {
    [key: string]: string | PERMISSION_TYPE;
  };
  valid: {
    [key: string]: boolean;
  };
}

const SignupStateContext = createContext<InitialStateType | null>(null);
const SignupDispatchContext = createContext<SignupDispatch | null>(null);

export const initialState = {
  input: {
    id: '',
    pw: '',
    digit: '',
    email: '',
    permission: PERMISSIONS.NONE,
  },
  valid: {
    id: false,
    pw: false,
    digit: false,
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
