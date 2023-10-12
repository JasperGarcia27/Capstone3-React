

import {useState,useEffect, useContext} from 'react';
import { Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Icon
import { BiPlusMedical } from "react-icons/bi";
import { MdSupervisedUserCircle } from "react-icons/md";

// Events
import EditProduct from './EditProduct';
import ArchiveProduct from "./ArchiveProduct"

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    //input states
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");

    const [isActive, setIsActive] = useState(true);
    const[showEdit, setShowEdit] = useState(false);
    
    function createProduct(e){

        e.preventDefault()
        
        let token = localStorage.getItem('token');
        console.log(token);

        fetch(`https://csp2test.onrender.com/b10/products/`,{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                name: name,
                description: description,
                price: price

            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(price);
            console.log(data);

            if(price <= 0) {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "The price should not to be a zero or less than"
				});
			}
            else {
                if(data){
                    Swal.fire({

                        icon:"success",
                        title: "Product Added"

                    })
                } 
                else {
                    Swal.fire({

                        icon: "error",
                        title: "Unsuccessful Product Creation",
                        text: data.message

                    })
                }
            }

            

        })

        setName("")
        setDescription("")
        setPrice("");
    }

    useEffect(() => {
    
        if(name !== '' && description !== '' && price !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }
    
     }, [name, description, price]);

  return (
    <>
        {['top'].map((placement) => (
            <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={<Tooltip>Add New Product</Tooltip>}>
                <Button variant="transparent" className='p-0'  onClick={handleShow}>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab size="small" color="success" aria-label="add">
                        <BiPlusMedical />
                            
                        </Fab>
                    </Box>
                </Button>
            </OverlayTrigger>
        ))}

        <Modal show={show} centered onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => createProduct(e)}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className='mb-5'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        { 
                            isActive 
                            ?<Button variant="primary" type="submit" onClick={handleClose} >Submit</Button>
                            :<Button variant="primary" type="submit" disabled>Submit</Button>
                        }
                    </Modal.Footer>
                    
                    
                </Form>
            </Modal.Body>
            
        </Modal>
    </>
  );
}

export default Example;