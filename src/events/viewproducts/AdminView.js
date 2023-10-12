import { useState, useEffect } from 'react';
import { Row, Col, Table, Button, ButtonGroup } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Icon
import { FaPlusCircle } from "react-icons/fa";

// Events
import EditProduct from '../EditProduct';
import ArchiveProduct from "../ArchiveProduct"
import AddProduct from '../AddProduct'



export default function AdminView({ productsData, fetchData  }) {


    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {
             return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td className='text-primary'><strong>{product.name}</strong></td>
                    <td>{product.description}</td>
                    <td>₱{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        <strong>{product.isActive ? "Available" : "Unavailable"}</strong>
                    </td>
                    <td><EditProduct product={product._id} fetchData={fetchData}/></td>
                    <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>  
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>
            <Row>
                <Col lg={12}>
                    <Col className='my-2' lg={{span:1, offset:12}}>
                        <AddProduct/>
                    </Col>
                    <Table className='text-center' variant='info' striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Availability</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
              
        </>

        )
}
