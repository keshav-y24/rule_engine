import constants from "../../Constants/Constants.jsx";

const intialState = {
  CommonSuccessData: [],
  CommonErrorData: [],
  InsertSuccessData: [],
  InsertErrorData: [],
  UpdateSuccessData: [],
  UpdateErrorData: [],
  isError: false
};

export default function (state = intialState, action) {

  switch (action.type) {
    case constants.GET_COMMON_SUCCESS:
      let obj = Object.assign({}, state, {
        isError: false
      });
      obj[action.root] = action.payload;
      return obj;
      return Object.assign({}, state, {
        CommonSuccessData: action.payload,
        CommonErrorData: [],
        isError: false
      });
    case constants.GET_COMMON_FAIL:
      return Object.assign({}, state, {
        CommonSuccessData: [],
        CommonErrorData: action.payload,
        isError: true
      });
    case constants.INSERT_COMMON_SUCCESS:
      return Object.assign({}, state, {
        InsertSuccessData: action.payload,
        InsertErrorData: [],
        isError: false
      });
    case constants.INSERT_COMMON_FAIL:
      return Object.assign({}, state, {
        InsertSuccessData: [],
        InsertErrorData: action.payload,
        isError: true
      });
    case constants.UPDATE_COMMON_SUCCESS:
      return Object.assign({}, state, {
        UpdateSuccessData: action.payload,
        UpdateErrorData: [],
        isError: false
      });
    case constants.UPDATE_COMMON_FAIL:
      return Object.assign({}, state, {
        UpdateSuccessData: [],
        UpdateErrorData: action.payload,
        isError: true
      });
    default:
      return state;
  }
}
