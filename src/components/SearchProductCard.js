import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";

// Icon
import { PiMagnifyingGlassFill } from "react-icons/pi";

// Event
import ProductSearch from '../events/ProductSearch';

function SearchProductCard() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isActive, setIsActive] = useState(true);

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleResetPassword = async (e) => {
        e.preventDefault();

    
        try {
            const token = localStorage.getItem('token'); // Replace with your actual JWT token
            const response = await fetch(`https://csp2test.onrender.com/b10/products/searchByName`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newPassword: password }),
            });
    
            if (response.ok) {
                
                setPassword('');
                setConfirmPassword('');
    
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                Toast.fire({
                    icon: 'success',
                    title: 'Password reset successfully'
                })
    
            } 
            else {

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                Toast.fire({
                    icon: 'error',
                    title: 'An error occurred. Please try again.'
                })
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
    
        if(password !== '' && confirmPassword !== '' && password === confirmPassword){
            setIsActive(true);
        }else{
            setIsActive(false);
        }
    
     }, [password, confirmPassword]);
  
    return (
        <>
            
            <Button className='pt-0 pb-2' variant="transparent" size='sm' onClick={handleShow}>Search <PiMagnifyingGlassFill/></Button>
            <Modal                 
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} 
                onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title><h2><strong>Search Product</strong></h2></Modal.Title>
                    
                </Modal.Header>
                <Modal.Body>
                    <ProductSearch/>  
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SearchProductCard;

