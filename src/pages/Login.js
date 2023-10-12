import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from "sweetalert2";


export default function Login(props) {
    const {user, setUser} = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
        fetch(`https://csp2test.onrender.com/b10/users/login`,{

        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

           email: email,
           password: password

           })
       })
       .then(res => res.json())
       .then(data => {
            console.log(data);

            if(typeof data.access !== "undefined"){
               
                localStorage.setItem('token', data.access);

                retrieveUserDetails(data.access)
                   
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
					title: 'Signed in successfully'
				  })
                setUser({
                    access: localStorage.getItem('token')
                })

                   
            } else {

                 Swal.fire({
                    title: "Authentication Failed Succesful",
                    icon: "error",
                    text: "Check your Login details"
                })
            }
       })
       // Clear input fields after submission
       setEmail('');
       setPassword('');


    }

    const retrieveUserDetails = (token) =>{
        fetch(`https://csp2test.onrender.com/b10/users/getUserDetails`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data);

            setUser({
                id:data._id,
                isAdmin: data.isAdmin
            })
        })
    }



    useEffect(() => {

       if(email !== '' && password !== ''){
           setIsActive(true);
       }else{
           setIsActive(false);
       }

    }, [email, password]);

    return (
		(user.id !== null) 
		?<Navigate to="/products" />
        :<>    
            <Row>
                <Col lg={{span:4, offset:4}} >
                    <Card className='my-lg-4 py-lg-5 px-4' border="primary">
                        <Card.Body>
                            <Card.Title><h1 className="my-5 text-center">Login</h1></Card.Title>
                            <Form onSubmit={(e) => authenticate(e)}>
                                <Col className='text-start'>
                                    <Form.Group class="mb-2" controlId="userEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Enter Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group class="mb-4" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Row>
                                    <Col lg={{span:4, offset:4}}>
                                        <Row>
                                            { 
                                                isActive 
                                                ?<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
                                                :<Button variant="primary" type="submit" id="submitBtn" disabled>Submit</Button>
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='my-3'>
                <Col className='text-center text-muted' sm={{span:2, offset:0}} lg={12}>
                    New to SpiceCraft Kitchen? <Link to={"/register"}>Create Account</Link>
                </Col>
            </Row>
            {/* <Row className='mb-2'>
                <Col class='d-inline' lg={{span:1, offset:4}}>
                    <hr/>
                </Col>
                <Col className='text-center text-muted' sm={{span:2, offset:0}} lg={{span:2, offset:0}}>
                    New to SpiceCraft Kitchen? <Link to={"/register"}>Create Account</Link>
                </Col>
                
            </Row> */}
            
        </> 
    )
}