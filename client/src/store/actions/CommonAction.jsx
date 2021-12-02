import axios from "axios";
import config from "../../config.jsx";
import constants from "../../Constants/Constants.jsx";

const GetCommonData_fetched = Todos => {

  if (Todos.dataToSend.state && Todos.dataToSend.statename) {
    localStorage.setItem(Todos.dataToSend.statename, JSON.stringify(Todos.data));
  }

  return {
    type: constants.GET_COMMON_SUCCESS,
    payload: Todos.data,
    root: Todos.dataToSend.statename ?? Todos.dataToSend.root
  };
};

const GetCommonData_fetch_error = error => {
  return {
    type: constants.GET_COMMON_FAIL,
    payload: error
  };
};

export const GetCommonData = (dataToSend, cb) => {

  if (dataToSend.data != null || dataToSend.data != undefined) {
    return function (dispatch, getState) {
      dispatch(GetCommonData_fetched({ data: dataToSend.data, dataToSend: dataToSend }));
    };
  }
  try {
    if ((dataToSend.state && localStorage.getItem(dataToSend.statename)) || localStorage.getItem(dataToSend.statename)) {

      return function (dispatch, getState) {
        let data = JSON.parse(localStorage.getItem(dataToSend.statename))
        dispatch(GetCommonData_fetched({ data: data, dataToSend: dataToSend }));
      }
    }
  }
  catch (e) {

  }


  return function (dispatch, getState) {
    axios
      .get(config.api.base_url + "/db/list/", {
        params: dataToSend
      })
      .then(data => {
        if (dataToSend.state && dataToSend.statename) {
          localStorage.setItem(dataToSend.statename, JSON.stringify(data.data.data));
        }
        if (cb) {
          cb(data);
        }
        dispatch(GetCommonData_fetched({ data: data.data.data[0], dataToSend: dataToSend }));
      })
      .catch(error => {
        dispatch(GetCommonData_fetch_error(error, dataToSend));
      });
  };
};


export const GetCommonspData = (dataToSend, cb) => {

  if (dataToSend.data != null || dataToSend.data != undefined) {
    return function (dispatch, getState) {
      dispatch(GetCommonData_fetched({ data: dataToSend.data, dataToSend: dataToSend }));
    };
  }


  return function (dispatch, getState) {
    axios
      .get(config.api.base_url + "/db/listsp/", {
        params: dataToSend
      })
      .then(data => {
        if (cb) {
          cb(data);
        }
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

export const InsertData = (dataToSend, cb) => {
  return function (dispatch, getState) {
    axios
      .post(config.api.base_url + "/db/insert/", {
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
      .post(config.api.base_url + "/db/update/", {
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




export const GetDataDirect = (dataToSend, cb) => {

  try {
    if ((dataToSend.state && localStorage.getItem(dataToSend.statename)) || localStorage.getItem(dataToSend.statename)) {

      let data = JSON.parse(localStorage.getItem(dataToSend.statename));
      cb(data);
      return;
    }
  }
  catch (e) {

  }
  //return function (dispatch, getState) {
  axios
    .get(config.api.base_url + "/db/list/", {
      params: dataToSend
    })
    .then(data => {
      if (dataToSend.state && dataToSend.statename) {
        localStorage.setItem(dataToSend.statename, JSON.stringify(data.data.data));
      }
      cb(data.data.data);

      //dispatch(GetCommonData_fetched({ data: data.data.data[0], dataToSend: dataToSend }));
    })
    .catch(error => {
      //dispatch(GetCommonData_fetch_error(error, dataToSend));
    });
  //};

};

export const GetRealTimeAgentData = (manager, context, cb) => {

  let url = config.api.realtimeurl + "RealTimeAgentStatus?managercode=" + (context == "" ? manager : "") + "&context=" + context;

  axios
    .get(url)
    .then(data => {

      cb(data);
      //dispatch(GetCommonData_fetched({ data: data.data.data[0], dataToSend: dataToSend }));
    })
    .catch(error => {
      //dispatch(GetCommonData_fetch_error(error, dataToSend));
    });
  //};

};

export const GetRealTimeQueueData = (context, cb) => {

  let url = config.api.realtimeurl + "RealTimeData?context=" + context;

  axios
    .get(url)
    .then(data => {

      cb(data);
      //dispatch(GetCommonData_fetched({ data: data.data.data[0], dataToSend: dataToSend }));
    })
    .catch(error => {
      //dispatch(GetCommonData_fetch_error(error, dataToSend));
    });
  //};

};

export const GetRecordingName = (calldataid, cb) => {

  let url = config.api.recordingnameurl + calldataid;

  axios
    .get(url)
    .then(data => {

      cb(data);
      //dispatch(GetCommonData_fetched({ data: data.data.data[0], dataToSend: dataToSend }));
    })
    .catch(error => {
      //dispatch(GetCommonData_fetch_error(error, dataToSend));
    });
  //};

};

export const GetAwsRecordingUrl = (key, cb) => {

  let url = config.api.awsrecordingurl + "?key=" + key + ".wav";

  axios
    .get(url)
    .then(data => {

      cb(data);
      //dispatch(GetCommonData_fetched({ data: data.data.data[0], dataToSend: dataToSend }));
    })
    .catch(error => {
      //dispatch(GetCommonData_fetch_error(error, dataToSend));
    });
  //};

};

export const GetRealTimeTotalData = (context, cb) => {

  let url = config.api.realtimeurl + "RealTimeData?context=" + context;

  axios
    .get(url)
    .then(data => {

      cb(data);
      //dispatch(GetCommonData_fetched({ data: data.data.data[0], dataToSend: dataToSend }));
    })
    .catch(error => {
      //dispatch(GetCommonData_fetch_error(error, dataToSend));
    });
  //};

};


export const SendOTP = (dataToSend, cb) => {
  let url = config.api.SendOTP;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'cG9saWN5 YmF6YWFy'
  }
  axios
    .post(url,
      dataToSend
      , {
        headers: headers
      })
    .then(data => {

      cb(data);
    })
    .catch(error => {
    });
};

export const ValidateOTP = (dataToSend, cb) => {
  let url = config.api.ValidateOTP;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'cG9saWN5 YmF6YWFy'
  }
  axios
    .post(url,
      dataToSend
      , {
        headers: headers
      })
    .then(data => {

      cb(data);
    })
    .catch(error => {
    });
};

export const GetComunicationData = (dataToSend, cb) => {

  return function (dispatch, getState) {
    axios
      .get(config.api.ServiceAPI + dataToSend.root, {
        params: dataToSend.data
      })
      .then(data => {
        cb(data);
        //dispatch(GetCommonData_fetched({ data: data, dataToSend: dataToSend }));
      })
      .catch(error => {
        dispatch(GetCommonData_fetch_error(error, dataToSend));
      });
  };
};


export const GetFileExists = (url, cb) => {
  debugger;
  axios
    .get(url)
    .then(data => {
      if (cb) {
        cb(data);
      }
    })
    .catch(error => {
      if (cb) {
        cb(error);
      }
    });
};