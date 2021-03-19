import React,{useState} from 'react';
import "../styles/Login.scss";
import LocalStorageService from "../utilities/localStorageService";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {rootUrl} from "../utilities/constants";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import { loginEndpoint } from "../utilities/endpoints";
import {useAuth,useUuid} from "../context/authcontext";

const csrfToken = Cookies.get('csrftoken');
export default function Login(props){
  const {setAuthTokens} = useAuth();
  const {setUserUuid} = useUuid();
  const [isLoggedIn, setLoggedIn] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors,getValues } = useForm();
  
  const logUserIn = item => {
    axios.post(`${rootUrl}${loginEndpoint}`,item,).then(
      (resp)=>{
        if(resp.status === 200){
        setAuthTokens(resp.data.access_token);
        setUserUuid(resp.data.user.id);
        setLoggedIn(true);
      }
      else{
        setIsError(true)
      }
      })
    .catch(error=>(setIsError(true)));
  
  };
  

  if(isLoggedIn){
    return <Redirect push to = {{pathname:"/"}} />;
  }
 else{
  return(<form onSubmit={handleSubmit(logUserIn)}>
  <div className ="form-row form-margin margin-bottom">
                <div className ="col">
                    <input type ="email" name ="email" placeholder ="Email" 
                    
                    className ="form-control" 
                     ref={register({
                      required: " Email address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                      }
                    })}/>
                     {errors.email && (<p style={{ color: "red" }}> {
                        errors.email.message}</p>)}
                </div>
                </div>
                <div className ="form-row form-margin place-order-signup">
            <div className ="col">
                <input type ="password" placeholder =" Create Password" 
                    className ="form-control" name ="password" 
                 
                    ref={register({
                      required: "Password  is required",})}/>
                     {errors.password && (
                     <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                    
            </div>
            
        </div>
  <input type="submit" value="Login"/>
</form>);
}
}