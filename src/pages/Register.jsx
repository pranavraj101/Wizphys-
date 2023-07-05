import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/firebase';

const Register = () => {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  // console.log(firebase);

  useEffect(() => {
    if(firebase.isLoggedIn) {
        //naggigate to home page
        navigate("/");

    }
  },[firebase, navigate]);
  
  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("Siging up the user...");
    const result = firebase.signupUserWithEmailAndPassword(email, password);
    console.log('Sucess Account Creation ', result)
    navigate("/update/profile");
  }


  return (
    <div className='container mt-5'>
    <Form onSubmit={handleSumbit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  onChange={(e) => setPassword(e.target.value)}
        value={password}
         type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
    </div>
  )
}

export default Register