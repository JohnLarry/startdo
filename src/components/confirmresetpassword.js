
import React, {useState} from "react";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {rootUrl} from "../utilities/constants";
import {confirmPasswordResetEndpoint} from "../utilities/endpoints"
import {useParams} from "react-router-dom"; 

import {useForm} from "react-hook-form";

const csrfToken = Cookies.get('csrftoken');




export default function ConfirmResetPassword (props){
  const { register, handleSubmit, errors,getValues } = useForm(
  
    );
    

    const ResetPassword =(item)=>{
            
      axios.post(`${rootUrl}${confirmPasswordResetEndpoint}`,item,{headers:{'X-CSRFToken':csrfToken}}).then(
       resp=>( setConfirmedReset(true))
       )   
       .catch(error=>error);
       
     };
     const {uid, token} = useParams();  
  const [isConfirmedReset, setConfirmedReset] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if(isConfirmedReset){
    return <Redirect push to = {{pathname:"/login"}} />;
  }
 else{
  return(

    <form onSubmit={handleSubmit(ResetPassword)}>
    <input type="hidden" name ="uid" value= {uid}/>
    <input type="hidden" name ="token" value= {token}/>

    <div className ="form-row form-margin place-order-signup">
            <div className ="col">
                <input type ="password" placeholder =" Create Password" 
                    className ="form-control" name ="new_password1" 
                 
                    ref={register({
                      required: "Password  is required",})}/>
                     {errors.password && (
                     <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                    
            </div>
            
        </div>
    <div className ="form-row form-margin place-order-signup">
            <div className ="col">
                   <input type ="password" name ="new_password2" 
                           placeholder ="Confirm Password" className ="form-control" 
                          
                            ref={register({
                            required: "Password confirmation is required",
                            validate: {
                            matchesPreviousPassword: (value) => {
                           const { new_password1 } = getValues();
                           return new_password1 === value || 'Passwords should match!';
                    },},})}/>
                                
                {errors.confirmPassword && (
                  <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
                 )}
            </div></div>
    <input type="submit"  value ="Confirm Password Reset"/>
  </form>

);
}}