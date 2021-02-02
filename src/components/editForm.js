import React, { Component } from "react";
export default class EditForm extends Component{

    render(){
        const item =this.props.item;
        const closeEditForm =this.props.closeEditForm;
        const update = this.props.update;
        const updateItemChanges =this.props.updateItemChanges;
        return(
            <React.Fragment>
               
            <form   className ="form-default" >
            <h1 className ="form-header" >Edit</h1>
                <textarea  name ="description" onChange ={(e)=>updateItemChanges(e)} value ={item.description}/>
                <input type="button" className ="btn btn-tertiary" value="Cancel" onClick ={()=>closeEditForm()}/>
                <input type="button" className ="button-primary" onClick ={()=>update(item)} value="Save"/>
            </form>
            </React.Fragment>
        );
    }
}