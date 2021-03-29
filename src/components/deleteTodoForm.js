import { Component } from "react";

export default class DeleteTodoForm extends Component{
    render(){
        const {item, closeDeleteForm, markAsCompleted, moveToFuture, isLoggedIn  } = this.props;
       

        

        return(
        <form className ="form-default">
            <p className="error-message">{isLoggedIn?"":"Login to your account to move or mark as done "}</p>
             <h1 class="form-header">  Remove From Today's Schedule </h1>
            <div className="delete-span-div" ><span>{item.description}</span></div>
            <div className="delete-btn-div"><input type="button" className ="button-secondary"  onClick ={()=>moveToFuture(item)} value="Move to future"/>
                <input type="button" className ="button-tertiary" value="Cancel" onClick ={()=>closeDeleteForm()}/>
                <input type="button" className ="button-primary" onClick ={()=>markAsCompleted(item)} value="Mark as done"/></div>
        </form>
        );
    }
}