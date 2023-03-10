import React, { useEffect, useState } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import Header from "../../components/header/Header";
import TelegramIcon from "@material-ui/icons/Telegram";
import { useDispatch } from "react-redux";
import axios from "axios";
// import Cookie from 'universal-cookie'
import "./auth.css";
import { dispatchLogin, dispatchUser } from "../../redux/actions/authAction";
import styled from "styled-components";
import { Check, Clear } from "@material-ui/icons";
import {useNotify} from '../../customHooks'

const InputSpan = styled.span`
  font-size: 12px;
  color: ${(props) => props.color};
  margin-top: 5px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  letter-spacing: 3px;
  margin-left: auto;
  transition: 1s all ease;
`;

// const {REACT_APP_CLIENT_URL} = process.env

function Login() {
  const history = useHistory()
  const dispatch = useDispatch();
  const notify = useNotify()
  // const cookies = new Cookie()
  useEffect(()=>{
    const userId = localStorage.getItem('userId')
    if(userId){
      return <Redirect to={"/dashboard"} />
    }
  },[])

  const initialState = {
    loginID: "",
    password: "",
  };

  const [data, setData] = useState(initialState);
  const { loginID, password } = data;
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  
  const adminLogin = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', {loginID: 'admin', password: 'superadmin'})
      window.localStorage.setItem("userId", res.data.user._id);
      dispatch(dispatchLogin());
      dispatch(dispatchUser(res.data.user));
      notify("success", "Login Successful");
      history.push("/dashboard");
    } catch (error) {
      console.log(error, 'this is the error')
      notify("error", "Login Failed");
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/users/login", { loginID, password });
      window.localStorage.setItem("isLogged", true);
      dispatch(dispatchLogin());
      dispatch(dispatchUser(res.data.user));
      notify('success', 'Login Successful')
      res.data.user.role === 'student' ? history.push('/student-dashboard') : history.push("/dashboard");
    } catch (error) {
      notify('error', 'Login Failed')
    }
  };

  const emailMatch = (e) => {
    // return String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return e.length > 4;
  };

  return (
    <div className="login">
      <Header />
      <div className="login-body">
        <div className="logo-sec">
          <h2>DE Resonance Academy</h2>
          <img
            className="login-img"
            src={
              "data:image/jpeg;base64,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"
            }
            alt="school-logo"
          />
          <Link to="/resultSearch" className="student-link">
            <p>
              Click here to view Your result
              <TelegramIcon />
            </p>
          </Link>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>Get Access</h1>
            <div className="login-div">
              <input
                onChange={handleChange}
                name="loginID"
                placeholder="Enter LoginID here"
              />
              {emailMatch(loginID) ? (
                <InputSpan
                  style={{ display: !loginID && "none" }}
                  color="#00ff00"
                >
                  Verification Confirmed <Check style={{ fontSize: "13px" }} />
                </InputSpan>
              ) : (
                <InputSpan style={{ display: !loginID && "none" }} color="red">
                  loginID Verification Failed{" "}
                  <Clear style={{ fontSize: "13px" }} />
                </InputSpan>
              )}
            </div>
            <div className="login-div">
              <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Enter Password here"
              />
            </div>
            <div className="login-div btn-group">
              <button disabled={!emailMatch(loginID)} className="login-button">
                Login
              </button>
              <button onClick={adminLogin} className="login-button">
                Guest Admin
              </button>
            </div>
            <Link className="login-forgot" to="/forgotPassword">
              Forgot Password? Click Here
            </Link>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Login;
