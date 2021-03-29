import { Component } from "react";

export default class DeleteNoteForm extends Component{
    render(){
        const {item, closeNoteForm, deleteItemPermanently, moveToTodayTodo, isLoggedIn} =this.props;
        

        return(
        <form className ="form-default" >
             <p className="error-message">{isLoggedIn?"":"Login to your account to to move or delete "}</p>
             <h1 class="form-header">  Today or Never </h1>
            <div className="delete-span-div">
                <span>{item.description}</span>
                </div>
            <div className="delete-btn-div" ><input type="button"  className ="button-secondary"  onClick ={()=>moveToTodayTodo(item)} value="Move to today"/>
                <input type="button" className ="button-tertiary"  value="Cancel" onClick ={()=>closeNoteForm()}/>
                <input type="button" className ="button-danger"  onClick ={()=>deleteItemPermanently(item)} value="Delete permanently"/></div>
        </form>
        );
    }
}