import axios from "axios";
import config from "../../config.jsx";
import constants from "../../Constants/Constants.jsx";

const GetCommonData_fetched = Todos => {

  return {
    type: constants.GET_COMMON_SUCCESS,
    payload: Todos.data,
    root: Todos.dataToSend.root
  };
};

const GetCommonData_fetch_error = error => {
  return {
    type: constants.GET_COMMON_FAIL,
    payload: error
  };
};

export const GetCommonData = dataToSend => {

  if (dataToSend.data != null || dataToSend.data != undefined) {
    return function (dispatch, getState) {
      dispatch(GetCommonData_fetched({ data: dataToSend.data, dataToSend: dataToSend }));
    };
  }


  return function (dispatch, getState) {
    axios
      .get(config.api.base_url + "/mdb/list/", {
        params: dataToSend
      })
      .then(data => {
        dispatch(GetCommonData_fetched({ data: data.data.data, dataToSend: dataToSend }));
      })
      .catch(error => {
        dispatch(GetCommonData_fetch_error(error, dataToSend));
      });
  };
  
};

const InsertData_fetched = Todos => {

  return {
    type: constants.INSERT_COMMON_SUCCESS,
    payload: Todos.data
  };
};

const InsertData_fetch_error = error => {
  return {
    type: constants.INSERT_COMMON_FAIL,
    payload: error
  };
};

export const addRecord = (dataToSend, cb) => {
  return function (dispatch, getState) {
    axios
      .post(config.api.base_url + "/mdb/insert", {
        data: dataToSend
      })
      .then(data => {
        if (cb) {
          cb(data);
        }
        dispatch(InsertData_fetched({ data: data.data }));
      })
      .catch(error => {
        dispatch(InsertData_fetch_error(error));
      });
  };
};


const UpdateData_fetched = Todos => {

  return {
    type: constants.UPDATE_COMMON_SUCCESS,
    payload: Todos.data
  };
};

const UpdateData_fetch_error = error => {
  return {
    type: constants.UPDATE_COMMON_FAIL,
    payload: error
  };
};

export const UpdateData = (dataToSend, cb) => {
  return function (dispatch, getState) {
    axios
      .put(config.api.base_url + "/mdb/update/", {
        data: dataToSend
      })
      .then(data => {
        if (cb) {
          cb(data);
        }
        dispatch(UpdateData_fetched({ data: data.data }));
      })
      .catch(error => {
        dispatch(UpdateData_fetch_error(error));
      });
  };
};
