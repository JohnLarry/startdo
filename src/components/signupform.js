
import React, {useState} from "react";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {rootUrl} from "../utilities/constants";
import {useForm} from "react-hook-form";
import { signUpEndpoint } from "../utilities/endpoints";

const csrfToken = Cookies.get('csrftoken');




export default function SignUp (props){
  const { register, handleSubmit, errors,getValues } = useForm(
  
    );
    const RegisterUser =(item)=>{
            
      axios.post(`${rootUrl}${signUpEndpoint}`,item,).then(
       resp=>(setRegistered(true))
       )   
       .catch(error=>(setIsError));
       return;
     };
  const [isRegistered, setRegistered] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if(isRegistered){
    return <Redirect push to = {{pathname:"/login"}} />;
  }
 else{
  return(

    <form onSubmit={handleSubmit(RegisterUser)}>
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
                    className ="form-control" name ="password1" 
                 
                    ref={register({
                      required: "Password  is required",})}/>
                     {errors.password1 && (
                     <p style={{ color: "red" }}>{errors.password1.message}</p>
                    )}
                    
            </div>
            
        </div>
    <div className ="form-row form-margin place-order-signup">
            <div className ="col">
                   <input type ="password" name ="password2" 
                           placeholder ="Confirm Password" className ="form-control" 
                          
                            ref={register({
                            required: "Password confirmation is required",
                            validate: {
                            matchesPreviousPassword: (value) => {
                           const { password1 } = getValues();
                           return password1 === value || 'Passwords should match!';
                    },},})}/>
                                
                {errors.password2 && (
                  <p style={{ color: "red" }}>{errors.password2.message}</p>
                 )}
            </div></div>
    <input type="submit"  value ="Register"/>
  </form>

);
}}