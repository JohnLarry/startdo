
import React, {useState} from "react";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {rootUrl} from "../utilities/constants";
import {useParams} from "react-router-dom"; 

import {useForm} from "react-hook-form";

const csrfToken = Cookies.get('csrftoken');




export default function VerifyEmail (props){
  const { register, handleSubmit, errors,getValues } = useForm(
  
    );
    

    const Verify =(item)=>{
            
      axios.post(`${rootUrl}/signup/`,item,{headers:{'X-CSRFToken':csrfToken}}).then(
       resp=>( setConfirmedEmail(true))
       )   
       .catch(error=>error);
       
     };
     const {key} = useParams();  
  const [isConfirmedEmail, setConfirmedEmail] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if(isConfirmedEmail){
    return <Redirect push to = {{pathname:"/login"}} />;
  }
 else{
  return(

    <form onSubmit={handleSubmit(Verify)}>
    <input type="hidden" name ="key" value= {key}/>
   

    
    <input type="submit"  value ="Confirm Email"/>
  </form>

);
}}