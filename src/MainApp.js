import React, { useState,Component , useEffect}  from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Carddescription, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TodayTodoForm from './components/todayTodoItemsForm';
import NoteForm from './components/noteItemsForm';
import EditForm from './components/editForm';
import DeleteTodoForm from './components/deleteTodoForm';
import DeleteNoteForm from './components/deleteNoteForm';
import './App.scss';
import {rootUrl} from "./utilities/constants";
import LocalStorageService from "./utilities/localStorageService";
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
import UserLogin from "./components/loginform";
import {AuthContext} from "./context/authcontext";
import {format, parse, parseISO,isToday, isThisWeek, isThisMonth, isThisYear, isYesterday } from 'date-fns';
class  MainApp  extends Component{
  static contextType =AuthContext;
  constructor(props){
    super(props);
    
     this.csrfToken = Cookies.get('csrftoken');
     this.todaysDate = Date.now();
     this.utcDate =this.todaysDate.getUTCDate;
      this.apiUrl = rootUrl;
    this.state ={
      isLoggedIn :false,
      isRefreshed: false,
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
      }],
      placeholdertodoItems : [{
        
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
      }],
      
        placeholdernoteItems:[{
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
        }],
        
    }
  }
 onRefreshCheckIfTokenExists = this.props.checkIfLoginExists;

componentDidMount(){
  this.onRefreshCheckIfTokenExists();
  this.checkLoginStatus();
    this.refreshItems();
    this.usersCompletedTodoNumber();
  
}
componentDidUpdate(prevProps, prevState, sp){
  if(prevState.isRefreshed === false) {    
  this.refreshItems();
  this.usersCompletedTodoNumber();
 
}
}
checkLoginStatus(){
  
  if(localStorage.getItem("access_token")!==null){
    return this.setState({isLoggedIn:true});
}
else{
  return this.setState({isLoggedIn:false});
}
};
placeholdertodoItems = [{
        
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
}];

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
  }];
  

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
OwnerChange =(uuid)=>{
  const {todoOwner} =this.state;
  let newOwner ={todo_owner:uuid}
  return (this.setState({todoOwner:newOwner}))
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
       <div className ="list-item-row">
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
       <div className ="list-item-row">
      {!this.state.itemCompleted && <input  type='button' className ="edit-icon list-item-btnlast btn-bg-transparent " onClick ={()=>this.openTodoEditForm(item)} />}
      {!this.state.itemCompleted && <input  type='button' className ="nav-icon list-item-btnlast btn-bg-transparent "  onClick ={()=>this.openNoteDeleteForm(item) }/>}
      </div>
      </div> 
  </li>);}
    


myNumbers = ()=>{
 
  const {yesterday, week, month, year} = this.state.my_number;
  const myNumber = 
  <div className ="div-cards">

<div className ="cards">
      <p>{yesterday}</p>
      <p>Yesterday</p>
    </div>
    
    <div className ="cards">
      <p>{week}</p>
      <p>Past 7 Days</p>
    </div>
    <div className ="cards" >
      <p>{month}</p>
      <p>Past 30 Days</p>
      </div>
    <div className ="cards" >
      <p>{year}</p>
      <p>This Year</p>
      </div>
     
  </div>
  
  return (myNumber);

}
/*add note form */
addFormField = ()=>{
  const {noteItems} =this.state;
   const newNoteItem =[...noteItems,{
    description:"",
    completed:false,
    draft:true,
  }];
  return(this.setState({noteItems:newNoteItem}));

}
/* remove  field in note form */
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

saveNote =(item,uuid)=>{
  let {authTokens} =this.context;
  let useruuid =uuid;
  let todo_owner =this.state.todoOwner;
  const notes =this.state.noteItems;
  const m = notes.filter(item=>(item.description!==""));
   m.map(item=>(axios.post(`${this.apiUrl}/api/todos/`,{...item,"todo_owner":`${useruuid}`},
   {headers:
    {
      'Authorization':`Bearer ${authTokens}`
    }}).then(
     resp=>{
       this.refreshItems();
       this.closeForm();
       this.setState({noteItems:this.placeholdernoteItems});
        
       }).catch(
       error =>(this.checkLoginStatus())
     )));
   return ;

}

saveTodo =(item,uuid)=>{
  let {authTokens} =this.context;
  let useruuid =uuid;

  const filteredTodo = this.state.todoItems;
  const placeholderTodo = this.state.placeholdertodoItems;
  const m = filteredTodo.filter(item=>(item.description!==""));
  m.map(item=> 
    (
      axios.post(`${this.apiUrl}/api/todos/`,{...item,"todo_owner":`${useruuid}`}, 
    {
      headers:
      {'Authorization':`Bearer ${authTokens}`}}).then(
        resp=>{
          this.closeForm();
          this.refreshItems();
          this.setState({todoItems:placeholderTodo});
          
          }).catch(
        error =>(this.checkLoginStatus())
        )));

  return ; 

}

refreshItems = () =>{
  let {authTokens} = this.context;
  
  
    console.log(authTokens);
 if(authTokens!==null){
axios.get(`${this.apiUrl}/api/todos/`,
{headers:
  {
    'Authorization':`Bearer ${authTokens}` }
}
).
then(
  resp=>{
    this.setState({items:resp.data})
    //isRefreshed is set true to stop infinite loop in componentdidupdate 
    this.setState({isRefreshed:true})
}
).catch(error=>(this.checkLoginStatus()))}
return;
}
usersCompletedTodoNumber = ()=>{
  let {authTokens} = this.context;
  if(authTokens!==null){
 axios.get(`${this.apiUrl}/api/todos/my_numbers/`,
 {headers:
  {
    'Authorization':`Bearer ${authTokens}` }
}
 ).
  then(
    resp=>{this.setState({my_number:resp.data})
  //isRefreshed is set true to stop infinite loop in componentdidupdate 
  this.setState({isRefreshed:true})
  }).
  catch(error=>(this.checkLoginStatus()));}
  return;
 }



deleteItemPermanently =(item) =>{
  let {authTokens} =this.context;
  axios.delete(`${this.apiUrl}/api/todos/${item.id}`,
  {headers:
    {'Authorization':`Bearer ${authTokens}`}
  }).
  then(resp=>this.refreshItems()).then(resp=>this.closeForm()).catch(
    error=>(this.checkLoginStatus())
  )
}

markItemAsCompleted =(item)=>{
  let {authTokens} = this.context;
if(item.id){
  const activeItem = this.state.activeItem;

  const itemToMoveToNote = {...activeItem};
  itemToMoveToNote.completed =true;

    axios.put(`${this.apiUrl}/api/todos/${item.id}/`,
    itemToMoveToNote,
    {headers:
      {
        'Authorization':`Bearer ${authTokens}`
      }}
    ).
    then(resp =>this.refreshItems()).then(resp=>this.closeForm()).catch(
      error=>(this.checkLoginStatus()));
      return;


}
}

markItemAsNote =(item)=>{
  let {authTokens} = this.context;
  if(item.id){
  const activeItem = this.state.activeItem;

  const itemToMoveToNote = {...activeItem};
  itemToMoveToNote.draft =true;

    axios.put(`${this.apiUrl}/api/todos/${item.id}/`,itemToMoveToNote,
    {headers:
      {
        'Authorization':`Bearer ${authTokens}`
      }
    }).
    then(resp =>this.refreshItems()).then(resp=>this.closeForm()).catch(
      error=>(this.checkLoginStatus()));
      return;


}}

markItemAsTodayTodo=(item)=>{
  let {authTokens} = this.context;
  if(item.id){
  const activeItem = this.state.activeItem;

  const itemToMoveToNote = {...activeItem};
  itemToMoveToNote.draft =false;

    axios.put(`${this.apiUrl}/api/todos/${item.id}/`,itemToMoveToNote,
    {headers:
      {
        'Authorization':`Bearer ${authTokens}`
      }
    }).
    then(resp =>this.refreshItems()).then(resp=>this.closeForm()).catch(
      error=>(this.checkLoginStatus()));
      return;


}}


updateItemDescription =(item)=>{
  let {authTokens} = this.context;
  axios.put(`${this.apiUrl}/api/todos/${item.id}/`,item,
  {headers:
    {
      'Authorization':`Bearer ${authTokens}`
    }
}).
  then(resp =>this.refreshItems()).then(resp=>this.closeForm()).catch(
    error=>(this.checkLoginStatus()));
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
      <div>{this.state.isLoggedIn?"":"Login to your account to view and save your data "}</div>
      <div className ="todomenu-scrolling-wrapper">
          <div className ={`todo-btn ${this.state.currentTab===1?'todobuton-active':''}`} onClick ={()=>this.toggleList(false,1)}>future<Link  to ="/login/"/></div>
          <div className ={`todo-btn ${  this.state.currentTab===2?'todobuton-active':''}`} onClick ={()=>this.toggleList(false,2)}>Today</div>
          <div className ={`todo-btn  ${ this.state.currentTab===3?'todobuton-active':''} `}onClick ={()=>this.toggleList(true,3)}>Done</div>
          <div className ={`todo-btn ${this.state.currentTab===4?'todobuton-active':''}`} onClick ={()=>this.toggleList(false,4)}>My numbers</div>
          
        </div>
        <div >{this.state.currentTab===1? this.upcommingTodo():''}</div>
      
        
        
    
        <div >{this.state.currentTab===2? this.todoToDisplay():''}</div>
        <div >{this.state.currentTab===3? 
      <div className="done-selector-div" >
        <select name ="doneDate" onChange ={(e)=>this.onDoneDateChange(e)} value ={this.state.selectedDate} className="done-selector"> 
        <option value ="1">Today</option>
        <option value ="2">Yesterday</option>
        <option value ="3" >This week</option>
        <option value ="4" >This month</option>
        <option value ="5" >This year</option>
        
      </select></div>:''}
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
     isLoggedIn ={this.state.isLoggedIn}
    
     addFormFieldForTodo ={this.addFormFieldForTodo} 
     removeFormFieldForTodo={this.removeFormFieldForTodo} 
     


     TodoInputChange ={this.TodoInputChange}
     close ={this.closeForm}  
     saveTodo={this.saveTodo}/> :""}

   {this.state.currentPageView===3? 
        
    <NoteForm  
    item ={this.state.noteItems}
    isLoggedIn ={this.state.isLoggedIn}
    close ={this.closeForm}
   
    NoteInputChange ={this.NoteInputChange}
    addFormField  ={this.addFormField}
    removeFormField ={this.removeFormField}
    saveNote  ={this.saveNote}/>:""}
    
   {this.state.currentPageView===4?
    <EditForm
    item ={this.state.activeItem}
    isLoggedIn ={this.state.isLoggedIn}
    update ={this.updateItemDescription}
    closeEditForm ={this.closeForm}
    updateItemChanges ={this.updateItemChanges}
    />:""}

{this.state.currentPageView===5?
    <DeleteTodoForm   
        item = {this.state.activeItem}
        isLoggedIn ={this.state.isLoggedIn}
         closeDeleteForm ={this.closeForm}
         markAsCompleted ={this.markItemAsCompleted}
        moveToFuture = {this.markItemAsNote}
        />:""}

{this.state.currentPageView===6?
<DeleteNoteForm   
        item = {this.state.activeItem}
        isLoggedIn ={this.state.isLoggedIn}
         closeNoteForm ={this.closeForm}
         deleteItemPermanently ={this.deleteItemPermanently}
        moveToTodayTodo = {this.markItemAsTodayTodo}
        />:""}
   
   
  </React.Fragment>);
  }
}


export default MainApp;
