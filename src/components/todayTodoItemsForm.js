import React, {Component} from 'react';

export default class TodayTodoForm extends Component{
    constructor(props){
        super(props)
        this.state ={
            todoItem: this.props.item,
                }
    }

    render(){
      const {item, close, TodoInputChange,addFormFieldForTodo, removeFormFieldForTodo, saveTodo} = this.props;
      return(
      <React.Fragment>
          
    <form className ="form-default" >

      <h1 class="form-header">  Today todo </h1>
     
     
      
         {item.map((todoItem,i)=>{
           return(
             <React.Fragment>
               
               <div className="row row-no-gutters ">
                 <div className=" col-xs-9 col-sm-11 "><input key ={i} 
            type ="text" 
            className ="form-input-text"
            name ="description"
            onChange ={(e)=>TodoInputChange(e,i)}
            value ={todoItem.description}/></div>
            <div className ="col-xs-3 col-sm-1">
            {i>=6&&<input type="button" name ="remove" className ="form-input-remove" onClick ={()=>removeFormFieldForTodo(i)} value="-"/>}
            {i>=5&&item.length-1===i&&<input type="button" className ="form-input-add" name ="add" onClick ={()=>addFormFieldForTodo()} value="+"/>}</div></div>
            
            
           
            
            </React.Fragment>
           )
         })}
      
        
            
        
     
      
      <div className ="center-align">
        <input type="button" className ="btn btn-tertiary"
        value ="Cancel" onClick ={() =>close()}/>
        <input type="button" className ="button-primary" onClick ={()=>saveTodo(item)} value ="Save"/></div>
     
    </form>

  </React.Fragment>)
      ;
  }
}