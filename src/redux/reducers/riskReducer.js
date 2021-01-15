import * as types from "../actions/actionTypes";
import * as stateInit from "../initialState";

export default function riskReducer(state = stateInit.initialRisk, action) {
  switch (action.type) {
    case types.LOAD_RISK_SUCCESS:
      return action.risk;
    case types.SELECT_RISK_LEVEL_SUCCESS:
      return { ...state, level: action.riskLevel };
    case types.CHANGE_DISPLAY_TYPE:
      return { ...state, displayDetail: action.displayDetail };
    default:
      return state;
  }
}
