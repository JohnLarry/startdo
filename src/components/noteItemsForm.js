import React, {Component} from 'react';

export default class NoteForm extends Component{
    constructor(props){
        super(props)
        this.state ={
            noteItemss: this.props.noteItem,
                }
    }

    render(){
        const {item, close, NoteInputChange,addFormField, removeFormField, saveNote} = this.props;
        return(
        <React.Fragment>
            
      <form className ="form-default">
      
        <h1 class=" form-header ">  Future tasks </h1>
        
       
        
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
          <input type="button" className ="button-primary" onClick={()=>saveNote(item)} value ="Save"/>
          </div>
        
      </form>

    </React.Fragment>)
        ;
    }
}