import { CONNECT_USER, LOGOUT_USER } from "../actions/user/actions-types";

const initialState = {
  infos: {},
  isLogged: false,
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT_USER:
      return { infos: action.payload, isLogged: true };
      break;

    case LOGOUT_USER:
      return initialState;
      break;

    default:
      return state;
      break;
  }

  return state;
}
