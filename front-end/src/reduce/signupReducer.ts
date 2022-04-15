import { Dispatch } from 'react';
import { SIGNUP_CHANGE, SIGNUP_CHANGE_TYPE } from '../reduce/actions';
import { InitialStateSignupType } from '../context/signupContext';

export interface StateType {
  name: string;
  value: string;
  isValid: boolean;
}

export type SignupDispatch = Dispatch<ActionType>;

type ActionType = { type: SIGNUP_CHANGE_TYPE; payload: StateType };

export const reducer = (
  state: InitialStateSignupType,
  action: ActionType,
): InitialStateSignupType => {
  const { name, value, isValid } = action.payload;

  switch (action.type) {
    case SIGNUP_CHANGE:
      return {
        input: {
          ...state.input,
          [name]: value,
        },
        valid: {
          ...state.valid,
          [name]: isValid,
        },
      };
    default:
      throw new Error('Unhandled action');
  }
};
