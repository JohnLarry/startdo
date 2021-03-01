import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route, Link, NavLink} from "react-router-dom";
import Login from "./components/loginform";
import Signup from "./components/signupform";
import Calc from ".//calculator/calculator";
import ResetPassword from "./components/forgotpassword";
import MainApp from "./MainApp";

function App() {

    return (
      <div className="App">
          <BrowserRouter>
          <Switch>
      <Route exact path="/" >
        <MainApp />
      </Route>
      <Route exact path="/login/" component={Login}/>
      <Route exact path="/signup/" component={Signup}/>
      <Route exact path="/calc/" component={Calc}/>
      <Route exact  path="/reset-password/" component={ResetPassword}/>
      </Switch>  
    </BrowserRouter> 
      </div>
    );
  }
  
  export default App;
 