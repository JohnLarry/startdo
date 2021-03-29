import React, { Component, useState } from "react";
import { Redirect } from "react-router";
import {useUuid, useAuth} from "../context/authcontext";
export default function EditForm (props){

   
        const {item, closeEditForm,update, updateItemChanges, isLoggedIn }  = props;
        
        const {authTokens} = useAuth();
        const {userUuid}  = useUuid();
   
      

      
        return(
            <React.Fragment>
               
            <form   className ="form-default" >
            <p className="error-message">{isLoggedIn?"":"Login to your account to save  "}</p>
            <h1 className ="form-header" >Edit</h1>
                <div className="editform-textarea-div">
                    <textarea  name ="description" onChange ={(e)=>updateItemChanges(e)} value ={item.description} className="editform-textarea"/>
                    </div>
                    <input type="hidden" name ="todo_owner" value={userUuid}/>
               <div className="editform-btn-div"> <input type="button" className ="btn btn-tertiary" value="Cancel" onClick ={()=>closeEditForm()}/>
               
                <input type="button" className ="button-primary" onClick ={()=>update(item)} value="Save"/></div>
            </form>
            </React.Fragment>
        );}
    
