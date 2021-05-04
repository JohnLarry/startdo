import React, {Component} from 'react';
import {useUuid, useAuth} from "../context/authcontext";

export default function NoteForm(props)
    {
        const {item,close, NoteInputChange,addFormField, removeFormField, saveNote, isLoggedIn} = props;
        const {userUuid}  = useUuid();
        return(
        <React.Fragment>
            
      <form className ="form-default" >
      <p className="error-message">{isLoggedIn?"":"Login to your account to save  "}</p>
        <h3 className="form-header" >  Future tasks </h3>
        
       
        
           {item.map((noteItem,i)=>{
             return(
               <React.Fragment>
               <div className="row row-no-gutters ">
                <div className=" col-xs-6 col-sm-11 ">
                <input key ={i} 
                type ="text" 
                className ="form-input-text"
                name ="description"
                onChange ={(e)=>NoteInputChange(e,i)}
                value ={noteItem.description}/>
                </div>
                <div className ="col-xs-6 col-sm-1 ">
                  
                {i>=6&&<input type="button" className ="form-input-remove"  name ="remove" onClick ={()=>removeFormField(i)} value="-"/>}
                {i>=5&&item.length-1===i&&<input className ="form-input-add" type="button" name ="add" onClick ={()=>addFormField()} value="+"/>}
                </div>
              </div></React.Fragment>
             )
           })}
        
          
              
          
       
       
        <div className="center-align">
           
          <input type="button" className ="btn btn-tertiary"
          value ="Cancel" onClick ={() =>close()}/>
          <input type="button" className ="button-primary" onClick={()=>saveNote(item,userUuid)} value ="Save"/>
          </div>
        
      </form>

    </React.Fragment>)
        ;
    }
