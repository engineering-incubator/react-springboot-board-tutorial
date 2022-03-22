import { SIGNUP_VALIDATION } from '_/reduce/actions';

interface ActionType {
  type: string;
  payload: { name: string; value: boolean };
}

interface StateType {
  id: boolean;
  pw: boolean;
  digit: boolean;
  email: boolean;
  domain: boolean;
  permission: boolean;
}

export const signupValidInitialState = {
  id: false,
  pw: false,
  digit: false,
  email: false,
  domain: false,
  permission: false,
};

export const signupValidReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case SIGNUP_VALIDATION:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
