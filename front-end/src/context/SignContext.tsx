import React, { useReducer, useContext, createContext } from 'react';
import { reducer, signupInitialState, StateType, SignupDispatch } from '_/reduce/signupReducer';

const SignupStateContext = createContext<StateType | null>(null);
const SignupDispatchContext = createContext<SignupDispatch | null>(null);

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, signupInitialState);

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
