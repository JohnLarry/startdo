import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route, Link, NavLink} from "react-router-dom";
import Login from "./components/loginform";
import Signup from "./components/signupform";
import Calc from ".//calculator/calculator";
import ResetPassword from "./components/forgotpassword";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" >
        <App />
      </Route>
      <Route path="/login/" component={Login}/>
      <Route path="/signup/" component={Signup}/>
      <Route path="/calc/" component={Calc}/>
      <Route path="/reset-password/" component={ResetPassword}/>

    </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
