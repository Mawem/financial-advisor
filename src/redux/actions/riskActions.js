import * as types from "./actionTypes.js";
import * as riskApi from "../../api/riskApi";

export function loadRiskSuccess(risk) {
  return { type: types.LOAD_RISK_SUCCESS, risk };
}

export function loadRisk() {
  return function (dispatch) {
    return riskApi
      .getRisk()
      .then((risk) => {
        dispatch(loadRiskSuccess(risk));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function selectRisk(riskLevel) {
  return { type: types.SELECT_RISK_LEVEL_SUCCESS, riskLevel };
}

export function changeDisplayDetail(displayType) {
  if (displayType === "Table") {
    return { type: types.CHANGE_DISPLAY_TYPE, displayDetail: "Chart" };
  }
  return { type: types.CHANGE_DISPLAY_TYPE, displayDetail: "Table" };
}
