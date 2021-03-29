import { useState,useEffect } from "react";
import {Link} from "react-router-dom";
export default function MenuBar(props){
    const [isLoggedIn, setIsLoggedIn] =useState(false);
    const {loginId,loginToken} =props;
    const logout =()=>{
        localStorage.clear();
        loginId();
        loginToken();
        setIsLoggedIn(false);
        
      }
      useEffect(()=>{
          if(localStorage.getItem("access_token")!==null){
              setIsLoggedIn(true);
          }
          else{
              setIsLoggedIn(false);
          }
      },[]);
     
    return(
        <nav className="menu-header">
            <header>
                Daydo
            </header>    
            <ul>
               {isLoggedIn?
               <li ><input type ="button" onClick={logout} value="Logout" /></li> :
               <li><Link to="/login">Login</Link></li> }
            </ul>
        
        </nav>
    )
}