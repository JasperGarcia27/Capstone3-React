import React from 'react';
import {Col, Card, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function Product(props){

	const {breakPoint, data} = props;
	const {_id, name, description, price} =  data;
	
	return(
        <Col className="my-2" xs={12} md={breakPoint}>            
            <Card className="cardHighlight mx-2" >
                <Card.Body>
                    <Card.Title className="text-center">
                        <Link to={`/product/${_id}`}>{name}</Link>
                    </Card.Title>
                    <Card.Text>{description}</Card.Text>
                    
                </Card.Body>
                <Card.Footer>
                    <h5 className="text-center">₱{price}</h5>
                    <Link className="btn btn-danger d-block" to={`/products/${_id}`}>Details</Link>
                </Card.Footer>
            </Card>
        </Col>
	)
}