
import React, {useState} from "react";
import {Spinner,Container} from "react-bootstrap";
import { Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {rootUrl} from "../utilities/constants";
import {LogUserIn} from "./loginform"

const csrfToken = Cookies.get('csrftoken');
const schema = yup.object({
  username: yup.string().email().required(),
  password1: yup.string().required().min(8,"minimium of 8 characters"),
  password2: yup.string().oneOf([yup.ref("password1"), null],"password must match"),
 
});

const RegisterUser =(item)=>{
            
 const signup = axios.post(`${rootUrl}/signup/`,item,{headers:{'X-CSRFToken':csrfToken}}).then(
     resp=>(resp.data) 
  )   
  .catch(error=>error);
  return signup;
};

export default function SignUp (props){
  const [isRegistered, setRegistered] = useState(false); 
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if(isRegistered){
    return <Redirect push to = {{pathname:"/login"}} />;
  }
 else{
  return(

  <div className ="form-container">
  <Row className ="form-row" >
    <Col><h3>Sign up</h3></Col>
    <Col> </Col>
    
  </Row>
  <Row className ="form-row" >
    <Col  className = "onboard-top-margin">


    <Formik
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setIsLoading(true);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)};
          
  
          const corsUrl = "https://secure-ravine-92476.herokuapp.com/";
          const url   = `${rootUrl}/signup/`;
  
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
          }).then((data) => {setRegistered(true);})
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
     {isError && (<span className ="error-color">There was an error, try again</span>)}
    { isLoading && (<Spinner
      as="span"
      animation="grow"
      role="status"
      aria-hidden="true"
      variant="info"
    />)}

    <Form.Group controlId="formBasicUserName" > 
        <Form.Label srOnly> Email </Form.Label>
        <Form.Control  
            size="lg" 
            type="email" 
            name="username"
            placeholder="Email address" 
            className = "onboard-top-margin" 
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            isValid={touched.username && !errors.username} />
         {errors.username && touched.username && errors.username}
          <Form.Control.Feedback></Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicUserEmail" > 
        <Form.Label srOnly> Email </Form.Label>
        <Form.Control  
            size="lg" 
            type="email" 
            name="email"
            placeholder="Email address" 
            className = "onboard-top-margin" 
            value={values.username}
            />
       
          <Form.Control.Feedback></Form.Control.Feedback>
      </Form.Group>
 

      <Form.Group controlId="formBasicPassword" >
      <Form.Label srOnly> Password </Form.Label>
        <Form.Control 
            size="lg" 
            type="password"
            name ="password1" 
            placeholder="Password" 
            className = "onboard-top-margin "
            value={values.password1}
            onBlur={handleBlur}
            onChange={handleChange}
            isValid={touched.password1 && !errors.password1}/>
             {errors.password1 && touched.password1 && errors.password1}
          <Form.Control.Feedback></Form.Control.Feedback>
      </Form.Group>



      <Form.Group controlId="formBasicConfirmPassword" >
      <Form.Label srOnly> Confirm Password</Form.Label>
        <Form.Control 
            size="lg" 
            type="password" 
            name ="password2"
            placeholder="Confirm Password" 
            className = "onboard-top-margin" 
            value ={values.password2}
            onBlur ={handleBlur}
            onChange ={handleChange}/>
             {errors.password2 && (<div>{errors.password2}</div>)}
      </Form.Group>

      <Button 
      variant="secondary afriDataButton " 
      size="lg" block  
      type="submit" 
      className ="onboard-top-margin"
      disabled={isSubmitting}>
        Register
      </Button>
      <Link to="/login" className="login-btn"> Login</Link>
</Form>

)}
    </Formik>
    
</Col>
    
    
  </Row>
  </div>

);
}}