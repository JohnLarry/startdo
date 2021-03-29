import React,{useState} from "react";
import {Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import { forgotPasswordEndpoint } from "../utilities/endpoints";
import axios from "axios";
import {rootUrl} from "../utilities/constants";
import {useForm} from "react-hook-form";

export default function ResetPassword (props){
 
  const { register, handleSubmit, errors,getValues } = useForm();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetEmailSent, setResetEmailSent] = useState(false);

  const Reset =(item)=>{

    setIsLoading(true);
    axios.post(`${rootUrl}${forgotPasswordEndpoint}`,item,).then(
      (resp)=>{
        if(resp.status === 200){
          setResetEmailSent(true);
      }
      else{
        setIsError(true)
      }
      })
    .catch(error=>(setIsError(true)));
  }
  if(isResetEmailSent){
    return(<Container>
      <span className="reset-email-sent">
        Check your email for password reset details </span>
        <Link to="/">Startdo Home  </Link>
    </Container>)
  }
  else{
	return(
<Container className ="form-container">
<h3 className="reset-password">Reset Password</h3>
  <form onSubmit={handleSubmit(Reset)} className="auth-form">
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
                <input type="submit" className="auth-button" value="Reset"/>
  </form>
  
  <div> <Link to="/login"  className="startdo-link"> Back to Login</Link></div>


</Container>
);
}}