import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import DataProvider, { store } from "./redux/store";
import axios from "axios";
import { dispatchLogout } from "./redux/actions/authAction";


// axios.defaults.baseURL = 'http://localhost:5000/'
const userId = localStorage.getItem('userId')
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
axios.defaults.withCredentials = true;
if(userId){
  axios.defaults.headers.userId = userId
}

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errMsg = error.response?.data?.msg;
    const errStatus = error.response?.status;
    if (errMsg) {
      if (errStatus === 400 && errMsg && errMsg.includes("Authorization")) {
        console.log('this is going out')
        localStorage.removeItem('userId')
        store.dispatch(dispatchLogout());
      }
    }
    return Promise.reject(error);
  }
);


axios.interceptors.request.use(
  function (config) {
    if(userId){
      console.log('userId is set to headers')
      config.headers['userId'] = userId
    }
    return config
  },
  function(error){
    return Promise.reject(error)
  }
);

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <App />
      </Router>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
