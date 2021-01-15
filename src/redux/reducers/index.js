import { combineReducers } from "redux";
import risk from "./riskReducer";

const rootReducer = combineReducers({
  risk,
});

export default rootReducer;
