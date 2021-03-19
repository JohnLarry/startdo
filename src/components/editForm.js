import React, { Component, useState } from "react";
import { Redirect } from "react-router";
import {useUuid, useAuth} from "../context/authcontext";
export default function EditForm (props){

   
        const item =props.item;
        const closeEditForm =props.closeEditForm;
        const update = props.update;
        const updateItemChanges =props.updateItemChanges;
        const {authTokens} = useAuth();
        const {userUuid}  = useUuid();
        const [isLoggedIn, setLoggedIn] = useState(false);
      

      
        return(
            <React.Fragment>
               
            <form   className ="form-default" >
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
    
