import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import BasketReducer from "./basketReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  basket: BasketReducer,
});

export default rootReducer;
