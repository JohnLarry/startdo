import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route, Link, NavLink} from "react-router-dom";
import Login from "./components/loginform";
import Signup from "./components/signupform";
import Calc from ".//calculator/calculator";
import ResetPassword from "./components/forgotpassword";
import ConfirmResetPassword from "./components/confirmresetpassword";
import MainApp from "./MainApp";
import VerifyEmail from './components/verifyemail';
import { AuthContext,UuidContext } from "./context/authcontext";
import MenuBar from "./components/menubar";
function App() {
  const [authTokens, setAuthTokens] = useState();
  const [userUuid, setUserUuid] = useState();
   const setToken =(data)=>{
    localStorage.setItem("access_token", JSON.stringify(data));
    setAuthTokens(data);
   }
   const setUuid =(data)=>{
     localStorage.setItem("todo_owner",JSON.stringify(data));
     setUserUuid(data);
   }
   const getTokenAndgetUserUuid=()=>{
     if(localStorage.getItem("access_token")&&localStorage.getItem("todo_owner")){
       const token =JSON.parse(localStorage.getItem("access_token"));
       const id =JSON.parse(localStorage.getItem("todo_owner"));
      setAuthTokens(token);
      setUserUuid(id);
     }

   }
   useEffect(() => {
    getTokenAndgetUserUuid();
  }, []);

   
    return (
      <div className="App">
         <BrowserRouter>
          <Switch>
            
         <AuthContext.Provider value={{authTokens,setAuthTokens:setToken}}>
           <UuidContext.Provider value={{userUuid, setUserUuid:setUuid}}>
      <Route exact path="/" >
      <MenuBar loginToken ={setAuthTokens} loginId ={setUserUuid}/>
        <MainApp />
      </Route>
      <Route exact path="/login/" component={Login}/>
      <Route exact path="/signup/" component={Signup}/>
      <Route exact path="/calc/" component={Calc}/>
      <Route exact  path="/reset-password/" component={ResetPassword}/>
      <Route exact path="/reset/confirm/:uid/:token/" component={ConfirmResetPassword}/>
      <Route exact path="/account/account-confirm-email/:key/" component={VerifyEmail}/>
        </UuidContext.Provider>
      </AuthContext.Provider> 
      </Switch> 
    </BrowserRouter> 
 
      </div>
    );
  }
  
  export default App;
 