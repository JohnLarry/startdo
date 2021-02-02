import { Component } from "react";

export default class DeleteTodoForm extends Component{
    render(){
        const item =this.props.item;
        const closeDeleteForm =this.props.closeDeleteForm;
        const markAsCompleted = this.props.markAsCompleted;
        const moveToFuture =this.props.moveToFuture;

        

        return(
        <form className ="form-default">
             <h1 class="form-header">  Remove From Today's Schedule </h1>
            <span>{item.description}</span>
            <div><input type="button" className ="button-secondary"  onClick ={()=>moveToFuture(item)} value="Move to future"/>
                <input type="button" className ="button-tertiary" value="Cancel" onClick ={()=>closeDeleteForm()}/>
                <input type="button" className ="button-primary" onClick ={()=>markAsCompleted(item)} value="Mark as done"/></div>
        </form>
        );
    }
}