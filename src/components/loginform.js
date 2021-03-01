import React, {useState} from 'react';
import "../styles/Login.scss";
import LocalStorageService from "../utilities/localStorageService";
import {Container} from "react-bootstrap";
import {Spinner, Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {rootUrl} from "../utilities/constants";
const schema = yup.object({
  
    username: yup.string().email().required(),
    
    password: yup.string().required().min(3),
   });
   const csrfToken = Cookies.get('csrftoken');
  //LocalStorage
  //const localStorageService = LocalStorageService.getService();

 export const LogUserIn =(item)=>{
            
    axios.post(`${rootUrl}/login/`,item,{headers:{'X-CSRFToken':csrfToken}}).then(
       resp=>(LocalStorageService.setToken(resp.data)) 
    )   
    .catch(error=>error);
};


export default function Login (props){

  
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
  
          if(isLoggedIn){
  
            return <Redirect push to={{ pathname: "/"}} />;
          }
  
        else{
      return(
  <Container className ="form-container">
    <Row className ="form-row">
      <Col><h3>Login</h3></Col>
      <Col> </Col>
      
    </Row>
    
  
  
    <Row className ="form-row">
     
   <Col>
      <Formik
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
           
            setIsLoading(true);
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values)};
      
              const corsUrl = "https://secure-ravine-92476.herokuapp.com/";
              const url   = `${rootUrl}/login/`;
      
               setTimeout(() => {
                 fetch(url , requestOptions)
              .then(async (response) => {
                  const data = await response.json();
      
                  // check for error response
                  if (!response.ok) {
                      // get error message from body or default to response status
                      const error = (data && data.message) || response.status;
                      return Promise.reject(error);
                  }
      
                return data; 
              }).then((data) => {setLoggedIn(true);})
              .catch((error) => {
                  
                  setIsError(true);
                  setIsLoading(false);
              });
                 setSubmitting(false);
               }, 10000);
             }}
        initialValues={{
          
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          isSubmitting,
        }) => (
  
      <Form className="center-a-form" onSubmit={handleSubmit}>
        
     {isError && (<span className ="error-color">Email or password is incorrect</span>)}
      { isLoading && (<Spinner
        as="span"
        animation="grow"
        role="status"
        aria-hidden="true"
        variant="info"
      />)}
      
    <Form.Group controlId="formBasicEmail" >
      <Form.Label srOnly>Email Address</Form.Label>
      <Form.Control 
          size="lg" 
          type="email" 
          placeholder="Email Address" 
          className = "onboard-top-margin"
          name ="username"
          value={values.username}
          onBlur={handleBlur}
          onChange={handleChange}
          isValid={touched.username && !errors.username}/>
              
          {errors.username && touched.username && errors.username }
  
  
  
            <Form.Control.Feedback></Form.Control.Feedback>
  
      
    </Form.Group>
  
  
    <Form.Group controlId="formBasicPassword" >
    <Form.Label srOnly> Password </Form.Label>
      <Form.Control 
          size="lg" 
          type="password" 
          placeholder="Password" 
          name ="password"
          className = "onboard-top-margin "
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          isValid={touched.password && !errors.password}/>
          {errors.password && touched.password && errors.password}
      <Form.Control.Feedback></Form.Control.Feedback>
    </Form.Group>
   <Button 
        variant="secondary " size="lg" block 
         type="submit" className ="onboard-top-margin"
          disabled={isSubmitting}>
      Login
    </Button>
  
    <Link to ="/reset-password" className="resetPassword-btn"> Forgot your password?
  </Link><Link to="/signup" className="signup-btn"> Create account</Link></Form>
  )}
      </Formik>
  </Col>
      
     
    </Row>
  </Container>
  );
  }}
  