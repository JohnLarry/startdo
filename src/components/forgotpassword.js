import React from "react";
import {Container} from "react-bootstrap";
import { Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ResetPassword (props){
	return(
<Container className ="form-container">
  <Row className ="form-row">
    <Col><h3>Reset Password</h3></Col>
    <Col> </Col>
    
  </Row>
  


  <Row className ="form-row">
   
 <Col>
 <Form>
  <Form.Group controlId="formBasicEmail" >
    <Form.Label srOnly>Email Address</Form.Label>
    <Form.Control size="lg" type="email" placeholder="Email Address" className = "onboard-top-margin"  />
    
  </Form.Group>
  <Button variant="secondary afriDataButton" size="lg" block 
           type="submit" className ="onboard-top-margin">
          Reset Password
  </Button>
  <Link to ="/login"><a href ="/login"> Back to Login</a></Link>
</Form>

</Col>
    
    
  </Row>
</Container>
);
}