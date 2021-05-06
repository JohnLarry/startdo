
import React, {useState} from "react";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";

import {rootUrl} from "../utilities/constants";
import {confirmPasswordResetEndpoint} from "../utilities/endpoints"
import {useParams} from "react-router-dom"; 

import {Container,Image} from "react-bootstrap";
import {useForm} from "react-hook-form";






export default function ConfirmResetPassword (props){
  const { register, handleSubmit, errors,getValues } = useForm(
  
    );
    

    const ResetPassword =(item)=>{
         setIsError(false);
         setIsLoading(true);   
      axios.post(`${rootUrl}${confirmPasswordResetEndpoint}${uid}/${token}/`,item,).then(
       (resp)=>{
         if(resp.status === 200){
          ( setConfirmedReset(true))
          
         }
         else{setIsError(true);
               setIsLoading(false);
         
         }
          }) .catch(error=>{setIsError(true);
            setIsLoading(false);});
       
        
      
       
     };
     const {uid, token} = useParams();  
  const [isConfirmedReset, setConfirmedReset] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false);

  if(isConfirmedReset){
    new Promise(resolve => { setTimeout(() => resolve(setConfirmed(true)), 3000); });
    return <Redirect push to = {{pathname:"/login"}} />;
  }
 else{
  return(
<Container className ="form-container">
<h3 className="reset-password">Change Password</h3>
 {isLoading&&<Image className="loadingspinner" src="/Iphone-spinner-2.gif"/>}
 {isError&&<div><p>Error occured, retry</p></div>}
 {isConfirmed&&<div><p>Paddword changed successful</p><Link to="/login" className="startdo-link">Login</Link></div>}
    <form onSubmit={handleSubmit(ResetPassword)}
     className="auth-form">
    

    <div className ="form-row form-margin place-order-signup">
            <div className ="col">
                <input type ="password" placeholder =" Enter new password" 
                    className ="form-control" name ="new_password1" 
                 
                    ref={register({
                      required: "Password  is required"
                      ,minLength:8})}/>
                     {errors.new_password1 && (
                     <p style={{ color: "red" }}>{errors.new_password1.message}</p>
                    )}
                    {errors.new_password1 && errors.new_password1.type === "minLength" && <span style={{ color: "red" }}>Enter atleast 8 characters</span>}
                    
            </div>
            
        </div>
        <div className ="form-row form-margin place-order-signup">
            <div className ="col"><input type="hidden"  name = "token"  
            value = {token} className ="form-control" 
            ref={register()}/></div></div>
        <div className ="form-row form-margin place-order-signup">
            <div className ="col"><input  type="hidden" name = "uid"  value = {uid} 
            className ="form-control"  ref={register()}/></div></div>
        
            
        

                                     

    <div className ="form-row form-margin place-order-signup">
            <div className ="col">
                   <input type ="password" name ="new_password2" 
                           placeholder ="Confirm password" className ="form-control" 
                          
                            ref={register({
                            required: "Password confirmation is required",
                            validate: {
                            matchesPreviousPassword: (value) => {
                           const { new_password1 } = getValues();
                           return new_password1 === value || 'Passwords should match!';
                    },},})}/>
                                
                {errors.new_password2 && (
                  <p style={{ color: "red" }}>{errors.new_password2.message}</p>
                 )}
            </div></div>
    <input type="submit" disabled ={isLoading} value ="Confirm Password Reset" className="passwordresetbutton" />
  </form>
  </Container>
);
}}