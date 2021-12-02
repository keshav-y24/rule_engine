import constants from "../../Constants/Constants.jsx";

const intialState = {
  alertMasterSuccessData: [],
  alertMasterErrorData: [],
  isError: false
};

export default function(state = intialState, action) {
    
  switch (action.type) {
    case constants.GET_ALERTMASTER_SUCCESS:

      return Object.assign({}, state, {
        alertMasterSuccessData: action.payload,
        alertMasterErrorData: [],
        isError: false
      });
    case constants.GET_ALERTMASTER_FAIL:
      return Object.assign({}, state, {
        alertMasterSuccessData: [],
        alertMasterErrorData: action.payload,
        isError: true
      });
    default:
      return state;
  }
}
