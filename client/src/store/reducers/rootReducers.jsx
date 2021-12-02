import { combineReducers } from "redux";

import AlertMasterReducer from "./AlertMasterReducer";
import CommonReducer from "./CommonReducer";

const rootReducer = combineReducers({
    AlertMaster : AlertMasterReducer,
    CommonData : CommonReducer,
});

export default rootReducer;
