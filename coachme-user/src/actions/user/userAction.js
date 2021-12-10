import { CONNECT_USER, LOGOUT_USER } from "./actions-types";

// action de connexion des users
export const connectUser = (user) => {
  return function (dispatch) {
    dispatch({
      type: CONNECT_USER,
      payload: user,
    });
  };
};

// action de deconnexion des users
export const logoutUser = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER,
      payload: null,
    });
  };
};
