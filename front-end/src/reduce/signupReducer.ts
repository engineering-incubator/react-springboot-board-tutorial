import { SIGNUP_CHANGE } from '_/reduce/actions';
import { PERMISSION_TYPE, PERMISSIONS } from '_/constants';

interface ActionType {
  type: string;
  payload: {
    [key: string]: string;
  };
}

interface StateType {
  id: string;
  pw: string;
  digit: string;
  email: string;
  domain: string;
  permission: PERMISSION_TYPE;
}

export const signupInitialState = {
  id: '',
  pw: '',
  digit: '',
  email: '',
  domain: '',
  permission: PERMISSIONS.NONE,
};

export const signupReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case SIGNUP_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
