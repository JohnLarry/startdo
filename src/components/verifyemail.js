
import React, {useState} from "react";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";
import {rootUrl} from "../utilities/constants";
import {confirmEmailEndpoint} from "../utilities/endpoints";
import {useParams} from "react-router-dom"; 
import {useForm} from "react-hook-form";
import {Container} from "react-bootstrap";






export default function VerifyEmail (props){
  const { register, handleSubmit, errors,getValues } = useForm(
  
    );
    
    const MovetoUrl =()=>{
      setConfirmedEmail(true)
    }
    const Verify =(item)=>{
            
      axios.post(`${rootUrl}${confirmEmailEndpoint}${key}/`,item,).then(
       resp=>{
         if(resp.status === 200){setConfirmed(true);
        setTimeout(MovetoUrl(),3000);
        }}
       )   
       .catch(error=>{setIsError(true)});
       
     };
     const {key} = useParams();  
  const [isConfirmedEmail, setConfirmedEmail] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false); 

  if(isConfirmedEmail){
    return <Redirect push to = {{pathname:"/login"}} />;
  }
 else{
  return(
    <Container>
    {isConfirmed&&<div><span>Email confirmation was succesful</span></div>}
    <form onSubmit={handleSubmit(Verify)}>
    <input type="hidden" name ="key" value= {key}/>
   

    
    <input type="submit"  value ="Confirm Email"/>
  </form>
  </Container>
);
}}