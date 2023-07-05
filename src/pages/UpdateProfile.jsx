import React, { useState } from 'react'
import { useFirebase } from '../context/firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
    
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [occ, setOcc] = useState('');

    const handleSumbit =  async(e) => {
        e.preventDefault();
        await firebase.handleUpdateProfile(name,phone,occ);
        navigate("/");
    };



  return (
    <div className='container mt-5'>
    <Form onSubmit={handleSumbit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your Name</Form.Label>
        <Form.Control onChange={(e) => setName(e.target.value)}
        value={name}
        type="text" placeholder="Enter Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control  onChange={(e) => setPhone(e.target.value)}
        value={phone}
         type="text " placeholder="Enter Your Number" />
         <Form.Text className="text-muted">
          We'll never share your Phone Number with anyone else.
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your Occupation</Form.Label>
        <Form.Control onChange={(e) => setOcc(e.target.value)}
        value={occ}
        type="text" placeholder="Unity Developer ... " />
      </Form.Group>

      


      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>

    </div>
  )
}

export default UpdateProfile