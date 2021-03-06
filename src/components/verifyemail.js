
import React, {useState} from "react";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";
import {rootUrl} from "../utilities/constants";
import {confirmEmailEndpoint} from "../utilities/endpoints";
import {useParams} from "react-router-dom"; 
import {useForm} from "react-hook-form";
import {Container,Image} from "react-bootstrap";





export default function VerifyEmail (props){
  const { register, handleSubmit, errors,getValues } = useForm(
  
    );
    
   
    const Verify =(item)=>{
      setIsError(false);
      setIsLoading(true);
            
      axios.post(`${rootUrl}${confirmEmailEndpoint}${key}/`,item,).then(
       resp=>{
         if(resp.status === 200){
           setConfirmed(true);
        
        }}
       )   
       .catch(error=>{
        setIsLoading(false);
         setIsError(true);
        });
       
     };
     const {key} = useParams();  
  const [isConfirmedEmail, setConfirmedEmail] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false); 

  if(isConfirmed){
    return <Redirect push to = {{pathname:"/login"}} />;
  }
 else{
  return(
    <Container>
      {isLoading&&<Image className="loadingspinner" src="/Iphone-spinner-2.gif"/>}
 {isError&&<div><p>Error occured, retry</p></div>}
 
    {isConfirmed&&<div><span>Email confirmation was succesful</span></div>}
    <form onSubmit={handleSubmit(Verify)}>
    <input type="hidden" name ="key" value= {key}/>
   

    
    <input type="submit" disabled = {isLoading} className = "verifyemail-btn" value ="Click to confirm your email"/>
  </form>
  </Container>
);
}}