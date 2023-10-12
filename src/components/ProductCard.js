// import Card from 'react-bootstrap/Card';
// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from "react";
// import {Row} from 'react-bootstrap';

// // Components
// import ProductView from './ProductView';


// function ProductCard({productProp}) {
//     const { _id, name, description, price} = productProp;
    // return (
    //     <Row className='mx-1 mt-4'>
    //         <Card className='mx-2' style={{ width: '18rem' }}>
    //             <Card.Body>
    //                 <Card.Title>{name}</Card.Title>
    //                 <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    //                 <Card.Text>{description}</Card.Text>
    //                 <Card.Text>Price: {price}</Card.Text>
    //                 <div className='text-center'>
    //                     <ProductView/>
    //                 </div>
    //             </Card.Body>
    //         </Card>
    //     </Row>
    // );
// }

// export default ProductCard;


import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProductCard({productProp}) {


    const { _id, name, description, price} = productProp;




    return (
        <Card border='success' className="text-center mx-lg-5 my-3">
            <Card.Body>
                <Row>
                    <Col  lg={{span:6, offset:3}}>
                        <Card border='danger' className='p-3 mb-5'>
                            <Card.Title className='shadow-lg p-5 mb-3 bg-white rounded'><h2>{name}</h2></Card.Title>
                        </Card>
                    </Col>
                </Row>
                <Card.Subtitle><h4>Description</h4></Card.Subtitle>
                <Row className='mb-4'>
                    <Col lg={{span:4, offset:4}}>
                        <Card.Text>{description}</Card.Text>
                    </Col>
                </Row>
                <Card.Subtitle className='mb-4'><h5>Price: ₱{price}</h5> </Card.Subtitle>
                <Link className="btn btn-success mb-4" to={`/products/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    )
}


ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}