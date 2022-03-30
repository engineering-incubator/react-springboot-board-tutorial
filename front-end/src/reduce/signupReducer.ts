import { Dispatch } from 'react';
import { SIGNUP_CHANGE, SIGNUP_CHANGE_TYPE } from '_/reduce/actions';
import { InitialStateType } from '_/context/signContext';

export interface StateType {
  name: string;
  value: string;
  isValid: boolean;
}

export type SignupDispatch = Dispatch<ActionType>;

type ActionType = { type: SIGNUP_CHANGE_TYPE; payload: StateType };

export const reducer = (state: InitialStateType, action: ActionType): InitialStateType => {
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
