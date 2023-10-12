import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";
import {MdOutlineLockReset} from "react-icons/md"


function ResetPassword() {

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
            const response = await fetch(`https://csp2test.onrender.com/b10/users/reset-password`, {
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
    
                let timerInterval

                Swal.fire({
                title: 'Updating...',
                html:
                    'I will save in <strong></strong> seconds.<br/><br/>',
                timer: 3000,
                didOpen: () => {
                    const content = Swal.getHtmlContainer()
                    const $ = content.querySelector.bind(content)

                    

                    Swal.showLoading()

                    timerInterval = setInterval(() => {
                    Swal.getHtmlContainer().querySelector('strong')
                        .textContent = (Swal.getTimerLeft() / 1000)
                        .toFixed(0)
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
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
        
            <Button variant="primary" onClick={handleShow}>Reset Password</Button>
            <Modal 
                // className='bg-dark'
                
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered 
                show={show} 
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                    
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                            New Password
                            </label>
                            
                            <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            />
                        </div>
                        <Modal.Footer>
                            { 
                                isActive 
                                ?<Button variant="primary" type="submit" id="submitBtn">Reset Password</Button>
                                :<Button variant="primary" type="submit" id="submitBtn" disabled>Reset Password</Button>
                            }
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ResetPassword;

