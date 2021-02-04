import React, { useState,Component }  from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Carddescription, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TodayTodoForm from './components/todayTodoItemsForm';
import NoteForm from './components/noteItemsForm';
import EditForm from './components/editForm';
import DeleteTodoForm from './components/deleteTodoForm';
import DeleteNoteForm from './components/deleteNoteForm';
import './App.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
import {format, parse, parseISO,isToday, isThisWeek, isThisMonth, isThisYear, isYesterday } from 'date-fns';
class  App  extends Component{
  constructor(props){
    super(props);
     this.csrfToken = Cookies.get('csrftoken');
     this.todaysDate = Date.now();
     this.utcDate =this.todaysDate.getUTCDate;
    this.state ={
      my_number:{},
      currentTab:1,
      itemCompleted:false,
      currentPageView:2,
      error:'',
      completedDate:"1",
      items:[],
      selectedDate:"1",
      activeItem:{
        id:"",
        description :"",
        completed :"",
        draft:""
      },
      todoItems:[{
        description:"",
        completed:false,
        draft:false,
      },{
        description:"",
        completed:false,
        draft:false,
      },{
        description:"",
        completed:false,
        draft:false,
      },{
        description:"",
        completed:false,
        draft:false,
      },{
        description:"",
        completed:false,
        draft:false,
      },{
        description:"",
        completed:false,
        draft:false,
      },],

      noteItems:[{
        description:"",
        completed:false,
        draft:true,
      },{
        description:"",
        completed:false,
        draft:true,
      },{
        description:"",
        completed:false,
        draft:true,
      },{
        description:"",
        completed:false,
        draft:true,
      },{
        description:"",
        completed:false,
        draft:true,
      },{
        description:"",
        completed:false,
        draft:true,
      }]
    }
  }
 
componentDidMount(){
  this.refreshItems();
  this.usersCompletedTodoNumber();
}

  placeholdernoteItems=[{
    description:"",
    completed:false,
    draft:true,
  },{
    description:"",
    completed:false,
    draft:true,
  },{
    description:"",
    completed:false,
    draft:true,
  },{
    description:"",
    completed:false,
    draft:true,
  },{
    description:"",
    completed:false,
    draft:true,
  },{
    description:"",
    completed:false,
    draft:true,
  }]
  

 NoteInputChange =(e,i)=>{
   const {noteItems} =this.state;
   const {name,value} =e.target;
   let currentNoteItems =[...noteItems];
   currentNoteItems[i][name] =value;
   return(this.setState({noteItems:currentNoteItems}));

 }
 TodoInputChange =(e,i)=>{
  const {todoItems} =this.state;
  const {name,value} =e.target;
  let currentTodoItems =[...todoItems];
  if(e.target.type==="checkbox"){
    currentTodoItems[i][name] =e.target.checked;
  }
  else{ currentTodoItems[i][name] =value;}
  return(this.setState({todoItems:currentTodoItems}));

}
EditInputChange =(e,i)=>{
  const {items} =this.state;
  const {name,value} =e.target;
  let currentTodoItems =[...items];
  if(e.target.type==="checkbox"){
    currentTodoItems[i][name] =e.target.checked;
  }
  else{ currentTodoItems[i][name] =value;}
  return(this.setState({items:currentTodoItems}));

}

onDoneDateChange =(e) =>{
  const {name,value} = e.target;
  if(name==="doneDate"){
   return this.setState({selectedDate:value});
  }
}
toggleList =(status,tabPosition) =>{
  let {itemCompleted} = this.state;
  let {currentTab} = this.state;
  if(tabPosition===1){
    return(
      this.setState({currentTab:1})
    )
  }
  else if(tabPosition===2){
    this.setState({currentTab:2})
      return(this.setState({itemCompleted:false}));

  }
    
    else if(tabPosition===3){
      return(this.setState({currentTab:3}))
      

    }
    else if(tabPosition===4){
      return(
        this.setState({currentTab:4}))
    }
  else{
    return "";
    
     }
    }
    /* format completed date to avod to been converted to local time zone*/
todoDateFormatter =(unformated_date)=>{
  var date =new Date(unformated_date);
  const hours = date.getUTCHours();
  const minutes = date.getMinutes();
  return(1 +((hours -1) % 12 ) + ":" + minutes.toString().padStart(2,0) + " "
  +((hours>11) ? "PM" :"AM"));
}
todoToDisplay  =()=>{

  /*this.state.itemCompleted is set to true if done tab is clicked and to false when todo tab is clicked */
  
  const filteredList = this.state.items.filter(item=>(item.completed===this.state.itemCompleted &&item.draft===false))
  return filteredList.map(item =>(
    <li 
      className ="future-todo" 
      key ={item.id}>
        <div className ="list-item-row">
      <div className =""> 
      <span 
        className ={`list-item-content ${this.state.itemCompleted?'completed-text':''}`}>
       {item.description}  
       </span>
       </div>
       <div className ="">
       {!this.state.itemCompleted && <input type='button' className ="edit-icon list-item-btnlast btn-bg-transparent " onClick ={()=>this.openTodoEditForm(item)} />}
      {!this.state.itemCompleted && <input type='button' className ="nav-icon list-item-btnlast btn-bg-transparent" onClick ={()=>this.openDeleteForm(item)} />}
     
      </div>
      </div>  </li>
    ));
  }

  completedTodoToDisplay  =()=>{

    
    
    const filteredList = this.state.items.filter(item=>(item.completed===true &&item.draft===false))
    return filteredList.map(item =>(
      <li 
        className ="future-todo" 
        key ={item.id}> 
        
         
         {this.state.selectedDate==="1"&&isToday(new Date(item.completed_date))&&<span className ="list-item-content"> {item.description} {this.todoDateFormatter(item.completed_date)}</span> } 
         {this.state.selectedDate==="2"&&isYesterday(new Date(item.completed_date))&& <span className ="list-item-content"> {item.description} {this.todoDateFormatter(item.completed_date)}</span> }  
         {this.state.selectedDate==="3"&&isThisWeek(new Date(item.completed_date))&& <span className ="list-item-content" >{item.description} </span>}
         {this.state.selectedDate==="4"&&isThisMonth(new Date(item.completed_date))&&<span className ="list-item-content" > { item.description} </span>}
         {this.state.selectedDate==="5"&&isThisYear(new Date(item.completed_date))&&<span className ="list-item-content" >{ item.description}  </span>}
        
       
         </li>
      ));
    }

upcommingTodo =()=>{
  const upcommingTodoItem = this.state.items.filter(item=>item.draft===true);
  return upcommingTodoItem.map(item =>
  <li className ="future-todo" key ={item.id}>
   
     
       <div className ="list-item-row">
         <div className ="">
       <span className ="list-item-content">{item.description} </span>
       </div>
       <div className ="">
      {!this.state.itemCompleted && <input  type='button' className ="edit-icon list-item-btnlast btn-bg-transparent " onClick ={()=>this.openTodoEditForm(item)} />}
      {!this.state.itemCompleted && <input  type='button' className ="nav-icon list-item-btnlast btn-bg-transparent "  onClick ={()=>this.openNoteDeleteForm(item) }/>}
      </div>
      </div> 
  </li>);}
    


myNumbers = ()=>{
 
  const {month,today, week, year} = this.state.my_number;
  const myNumber = 
  <div className ="div-cards">

<div className ="cards">
      <p>{today}</p>
      <p>Today</p>
    </div>
    
    <div className ="cards">
      <p>{week}</p>
      <p>Week</p>
    </div>
    <div className ="cards" >
      <p>{month}</p>
      <p>Month</p>
      </div>
    <div className ="cards" >
      <p>{year}</p>
      <p>Year</p>
      </div>
  
  </div>
  
  return (myNumber);

}

addFormField = ()=>{
  const {noteItems} =this.state;
   const newNoteItem =[...noteItems,{
    description:"",
    completed:false,
    draft:true,
  }];
  return(this.setState({noteItems:newNoteItem}));

}
removeFormField =(i)=>{
  const {noteItems} =this.state;
   const noteItemsForRemoval =[...noteItems
   ];
  noteItemsForRemoval.splice(i,1);
   return(this.setState({noteItems:noteItemsForRemoval}));


}
addFormFieldForTodo = ()=>{
  const {todoItems} =this.state;
   const newTodoItem =[...todoItems,{
    description:"",
    completed:false,
    draft:false,
  }];
  return(this.setState({todoItems:newTodoItem}));

}

removeFormFieldForTodo =(i)=>{
  const {todoItems} =this.state;
   const todoItemsForRemoval =[...todoItems
   ];
  todoItemsForRemoval.splice(i,1);
   return(this.setState({todoItems:todoItemsForRemoval}));

}

/* save note items*/

saveNote =(item)=>{
  const notes =this.state.noteItems;
  const m = notes.filter(item=>(item.description!==""));
   m.map(item=>(axios.post("https://startdobackend.herokuapp.com/api/todos/",item,{headers:{'X-CSRFToken':this.csrfToken}}).then(
     resp=>(this.refreshItems())).then(resp=>(this.closeForm())).catch(
       error =>(this.setState({error:"error occured while saving note"}))
     )));
   return ;

}

saveTodo =(item)=>{
  const filteredTodo = this.state.todoItems;
  const m = filteredTodo.filter(item=>(item.description!==""));
  m.map(item=> 
    (axios.post("https://startdobackend.herokuapp.com/api/todos/",item, {headers:{'X-CSRFToken':this.csrfToken}}).then(
      resp=>this.refreshItems()).then(resp=>this.closeForm()).catch(error=>(this.setState({error:"Error occured while saving note"})))));

  return ; 

}

refreshItems = () =>{
axios.get('https://startdobackend.herokuapp.com/api/todos/').
then(
  resp=>(this.setState({items:resp.data}))
).catch(error=>(this.setState({error:"couldn't  refresh item"})))

}
usersCompletedTodoNumber = ()=>{
 axios.get('https://startdobackend.herokuapp.com/api/todos/my_numbers/').
  then(
    resp=>(this.setState({my_number:resp.data}))).
  catch(error=>(this.setState({error:"Please try again"})));
  
 }



deleteItemPermanently =(item) =>{
  console.log(this.csrfToken);
  axios.delete(`https://startdobackend.herokuapp.com/api/todos/${item.id}`,{headers:{'X-CSRFToken':this.csrfToken}}).
  then(resp=>this.refreshItems()).then(resp=>this.closeForm()).catch(
    error=>(this.setState({error:"couldn't delete try agian later"} ))
  )
}

markItemAsCompleted =(item)=>{

if(item.id){
  const activeItem = this.state.activeItem;

  const itemToMoveToNote = {...activeItem};
  itemToMoveToNote.completed =true;

    axios.put(`https://startdobackend.herokuapp.com/api/todos/${item.id}/`,itemToMoveToNote,{headers:{'X-CSRFToken':this.csrfToken}}).
    then(resp =>this.refreshItems()).then(resp=>this.closeForm()).catch(
      error=>(this.setState({error:"couldn't update  "})));
      return;


}
}

markItemAsNote =(item)=>{
  if(item.id){
  const activeItem = this.state.activeItem;

  const itemToMoveToNote = {...activeItem};
  itemToMoveToNote.draft =true;

    axios.put(`https://startdobackend.herokuapp.com/api/todos/${item.id}/`,itemToMoveToNote,{headers:{'X-CSRFToken':this.csrfToken}}).
    then(resp =>this.refreshItems()).then(resp=>this.closeForm()).catch(
      error=>(this.setState({error:"couldn't update  "})));
      return;


}}

markItemAsTodayTodo=(item)=>{
  if(item.id){
  const activeItem = this.state.activeItem;

  const itemToMoveToNote = {...activeItem};
  itemToMoveToNote.draft =false;

    axios.put(`https://startdobackend.herokuapp.com/api/todos/${item.id}/`,itemToMoveToNote,{headers:{'X-CSRFToken':this.csrfToken}}).
    then(resp =>this.refreshItems()).then(resp=>this.closeForm()).catch(
      error=>(this.setState({error:"couldn't update  "})));
      return;


}}


updateItemDescription =(item)=>{
  axios.put(`https://startdobackend.herokuapp.com/api/todos/${item.id}/`,item,{headers:{'X-CSRFToken':this.csrfToken}}).
  then(resp =>this.refreshItems()).then(resp=>this.closeForm()).catch(
    error=>(this.setState({error:"couldn't update  "})));
    return;
}

updateItemChanges =(e)=>{
  const {name,value} =e.target;
  const {activeItem} =this.state;
  const activeItemUpdate = {...activeItem}
  activeItemUpdate[name] =value;
  return(this.setState({activeItem:activeItemUpdate}));
}

openTodayTodoForm =()=>{
const {currentPageView} =this.state;
return this.setState({currentPageView:2}) 

}

openNoteForm =()=>{
const {currentPageView} =this.state;
return this.setState({currentPageView:3}) 

}

openTodoEditForm =(item)=>{
const {activeItem} =this.state;
const {currentPageView} =this.state;
this.setState({activeItem:item});

return this.setState({currentPageView:4})

}



openDeleteForm =(item)=>{
  const {activeItem} =this.state.activeItem;
   const {currentPageView} =this.state;
   this.setState({activeItem:item});

return this.setState({currentPageView:5})  

}
openNoteDeleteForm =(item)=>{
  const {activeItem} =this.state.activeItem;
   const {currentPageView} =this.state;
   this.setState({activeItem:item});

return this.setState({currentPageView:6});  

}

closeForm =()=>{
const {currentPageView} =this.state;
return this.setState({currentPageView:1})

}
  render(){
    return(<React.Fragment>
      {this.state.currentPageView===1?
      
    <div >
      <div className ="todomenu-scrolling-wrapper">
          <div className ={`todo-btn ${this.state.currentTab===1?'todobuton-active':''}`} onClick ={()=>this.toggleList(false,1)}>future</div>
          <div className ={`todo-btn ${  this.state.currentTab===2?'todobuton-active':''}`} onClick ={()=>this.toggleList(false,2)}>Today</div>
          <div className ={`todo-btn  ${ this.state.currentTab===3?'todobuton-active':''} `}onClick ={()=>this.toggleList(true,3)}>Done</div>
          <div className ={`todo-btn ${this.state.currentTab===4?'todobuton-active':''}`} onClick ={()=>this.toggleList(false,4)}>My numbers</div>
          
        </div>
       {this.state.currentTab===1? this.upcommingTodo():''}
      <div >
        
        
    
      {this.state.currentTab===2? this.todoToDisplay():''}
      {this.state.currentTab===3? 
      <select name ="doneDate" onChange ={(e)=>this.onDoneDateChange(e)} value ={this.state.selectedDate}> 
        <option value ="1">Today</option>
        <option value ="2">Yesterday</option>
        <option value ="3" >This week</option>
        <option value ="4" >This month</option>
        <option value ="5" >This year</option>
        
      </select>:''}
      <div>{this.state.currentTab===3? this.completedTodoToDisplay():' '}</div>
     
      {this.state.currentTab===4? this.myNumbers():''}

      
      <div> 
      {
        this.state.currentTab===1&& <input type ="button" 
                                        className ="floating-button  "
                                        onClick ={()=>this.openNoteForm()}
                                        value = " +"/>
        }{
          this.state.currentTab===2&& <input type ="button" 
                                          className ="floating-button"
                                          onClick ={()=>this.openTodayTodoForm()}
                                          value = "+"/>
          }</div>
    </div>
  </div>:""}
  {this.state.currentPageView===2? 
     <TodayTodoForm 
     item ={this.state.todoItems} 
     addFormFieldForTodo ={this.addFormFieldForTodo} 
     removeFormFieldForTodo={this.removeFormFieldForTodo} 
     TodoInputChange ={this.TodoInputChange}
     close ={this.closeForm}  
     saveTodo={this.saveTodo}/> :""}

   {this.state.currentPageView===3? 
        
    <NoteForm  
    item ={this.state.noteItems}
    close ={this.closeForm}
    NoteInputChange ={this.NoteInputChange}
    addFormField  ={this.addFormField}
    removeFormField ={this.removeFormField}
    saveNote  ={this.saveNote}/>:""}
    
   {this.state.currentPageView===4?
    <EditForm
    item ={this.state.activeItem}
    update ={this.updateItemDescription}
    closeEditForm ={this.closeForm}
    updateItemChanges ={this.updateItemChanges}
    />:""}

{this.state.currentPageView===5?
    <DeleteTodoForm   item = {this.state.activeItem}
         closeDeleteForm ={this.closeForm}
         markAsCompleted ={this.markItemAsCompleted}
        moveToFuture = {this.markItemAsNote}
        />:""}

{this.state.currentPageView===6?
<DeleteNoteForm   item = {this.state.activeItem}
         closeForm ={this.closeForm}
         deleteItemPermanently ={this.deleteItemPermanently}
        moveToTodayTodo = {this.markItemAsTodayTodo}
        />:""}
   
   
  </React.Fragment>);
  }
}


export default App;
