import {Row, Col, Form, Button, Card} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import Swal from "sweetalert2";
import { Navigate, Link, userNavigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';


export default function Register(){
	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// State to determine whether the submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

	const navigate = useNavigate();

	// Check if the values are logged

	console.log(email);
	console.log(password);
	console.log(confirmPassword);

	function registerUser(e){
		// Prevents page redirection via form submissions
		e.preventDefault();

		fetch(`https://csp2test.onrender.com/b10/users/register`, {
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
			console.log(data)
			
			// data will only contain an email property if we can properly save our user
			if(data){
				// Clear input fields
				setEmail("");
				setPassword("");
				setConfirmPassword("")

				Swal.fire({
                    title: "Register Successful!",
                    icon: "success",
                    text: "Thank you for registratrion"
                })
				navigate("/login")
			} 
			else {
				Swal.fire({
                    title: "Failed to Register",
                    icon: "error",
                    text: "error for registration"
                })
			}
		})

	}

	useEffect(()=>{
		if(email !== "" && password !=="" && confirmPassword !== "" && password === confirmPassword){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	},[ email, password, confirmPassword])


	return(
		(user.id !== null) ?
            <Navigate to="/products" />
        :
		<>    
            <Row>
                <Col lg={{span:4, offset:4}} >
                    <Card className='my-4 py-lg-5 px-4' border="danger">
                        <Card.Body>
                            <Card.Title><h1 className="my-5 text-center">Register</h1></Card.Title>
							<Form onSubmit={(e) => registerUser(e)}>
							<Form.Group className='mb-2'>
								<Form.Label>Email:</Form.Label>
								<Form.Control 
								type="email" 
								placeholder="Enter Email" 
								required 
								value={email} 
								onChange={e => {setEmail(e.target.value)}}/>
							</Form.Group>

							<Row>
							<Col lg={6} sm={12} class="col-lg-6">
								<Form.Group className='mb-2'>
									<Form.Label>Password:</Form.Label>
									<Form.Control 
									type="password" 
									placeholder="Enter Password" 
									required 
									value={password} 
									onChange={e => {setPassword(e.target.value)}}/>
								</Form.Group>
							</Col>
							<Col lg={6} sm={12} class="col-sm-6">
								<Form.Group className='mb-4'>
									<Form.Label>Confirm Password:</Form.Label>
									<Form.Control 
									type="password" 
									placeholder="Verify Password" 
									required 
									value={confirmPassword} 
									onChange={e => {setConfirmPassword(e.target.value)}}/>
								</Form.Group>
							</Col>
							</Row>
							<Row className='text-lg-end text-center'>
								<Col>
								{ 
									isActive
									?<Button variant="danger" type="submit" id="submitBtn">Submit</Button>
									:<Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
								}  
								</Col>
							</Row> 
						</Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='my-3'>
                <Col className='text-center text-muted' sm={{span:2, offset:0}} lg={12}>
                    Already have an account? <Link to={"/login"}>Click here</Link> to log in.
                </Col>
            </Row>
        </>

		
		
		
	)
	
}