import React , { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useFirebase } from '../context/firebase';

const Cards = (props) => {
    const firebase = useFirebase();
    const [url, setURL] = useState(null);
    

    



  return (
    <div>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"  />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Phone Number: {props.phone}</ListGroup.Item>
        <ListGroup.Item>Occupation: {props.occ}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="/update/profile">Update Details</Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Cards