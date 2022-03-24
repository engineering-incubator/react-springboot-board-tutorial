import { Dispatch } from 'react';
import { SIGNUP_CHANGE } from '_/reduce/actions';
import { PERMISSION_TYPE, PERMISSIONS } from '_/constants';

export interface StateType {
  input: {
    [key: string]: string | PERMISSION_TYPE;
  };
  valid: {
    [key: string]: string | boolean;
  };
}

export type SignupDispatch = Dispatch<ActionType>;

type ActionType = { type: 'SIGNUP_CHANGE'; payload: StateType };

export const signupInitialState = {
  input: {
    id: '',
    pw: '',
    digit: '',
    email: '',
    domain: '',
    permission: PERMISSIONS.NONE,
  },
  valid: {
    id: true,
    pw: true,
    digit: true,
    email: true,
    domain: true,
    permission: true,
  },
};

export const reducer = (state: StateType, action: ActionType) => {
  const { name, value } = action.payload.input;
  const { isValid } = action.payload.valid;

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
