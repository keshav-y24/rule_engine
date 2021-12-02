import axios from "axios";
import config from "../../config.jsx";
import constants from "../../Constants/Constants.jsx";

const GetAlertMasterData_fetched = Todos => {
    return {
      type: constants.GET_ALERTMASTER_SUCCESS,
      payload: Todos.data
    };
  };
  
  const GetAlertMasterData_fetch_error = error => {
    return {
      type: constants.GET_ALERTMASTER_FAIL,
      payload: error
    };
  };
  
  export const GetAlertMasterData = dataToSend => {
      
    return function(dispatch, getState) {
      axios
        .get(config.api.base_url + "/alertmaster/firstListingOfData", {
          params: dataToSend
        })
        .then(data => {
            
            
          dispatch(GetAlertMasterData_fetched({ data: data.data }));
        })
        .catch(error => {
          dispatch(GetAlertMasterData_fetch_error(error));
        });
    };
  };
  