import react, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {base_apiURL} from "./constants";


export default class UserLogin extends Component{
    constructor(props){
        super(props);
        this.csrfToken = Cookies.get('csrftoken');
        this.state={
              loginDetails:{
                  username:"",
                  email:"",
                  password:"",
        }}}
      //LocalStorage
      

        onInputChange =(e)=>{
            
            e.preventDefault();
            const {loginDetails} = this.state;
            loginDetails[e.target.name] = e.target.value;
            
            return(this.setState({loginDetails:loginDetails}));

        }

        logUserIn =()=>{
            let item = this.state.loginDetails;
            axios.post(base_apiURL+ "/login/",item,{headers:{'X-CSRFToken':this.csrfToken}})
                
            .catch(error=>error);
        }
        render(){
            return(
                <form>
                    <div className="form-row">
                        <label>Username:</label>
                        <input type ="text" name ="username" onChange={(e)=>this.onInputChange(e)} required/>
                    </div>
                    <div className ="form-row">
                        <label>Email:</label>
                        <input type ="text" name ="email" onChange={(e)=>this.onInputChange(e)}  required/>
                    </div>
                    <div className ="form-row">
                        <label>Password:</label>
                        <input type ="password" name ="password" onChange={(e)=>this.onInputChange(e)} required/>
                    </div>
                    <div className ="form-row">
                        <input type ="button" value ="Login" onClick ={this.logUserIn} />
                    </div>
                </form>
            );
        }}

  