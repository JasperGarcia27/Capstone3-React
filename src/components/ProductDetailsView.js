import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

	const { productId } = useParams();
	const { user } = useContext(UserContext);
	
  	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState("");

	const [isActive, setIsActive] = useState(true);

	const getOrder = (productId) => {

		fetch(`https://csp2test.onrender.com/b10/users/getOrder`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: quantity
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(quantity)

			console.log(data.message);
			
			if(quantity <= 0) {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "The quantity should not to be a zero or less than"
				});
			}
			else {
				if (data.message !== 'Order Successfully.') {

					Swal.fire({
						title: "Successfully Checkout",
						icon: 'success',
						text: "You have successfully checkout for this product."
					});

					navigate("/products");

				} else {

					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please try again."
					});

				}
			}

		});

	};

	useEffect(()=> {

		console.log(productId);

		fetch(`https://csp2test.onrender.com/b10/products/${productId}`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);

		});

		if(quantity !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

	}, [productId, quantity]);

	return(
		<Container className="mt-5">
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card className='bg-dark mb-3'>
						<Card border='info' className='m-3'>
							<Card.Body className="text-center">
								<Row>
									<Col lg={6} className='py-lg-5 pb-3'>
										<Card>
											<Card.Title className='  py-5'><h1>{name.toUpperCase()}</h1></Card.Title>
										</Card>
									</Col>
									<Col lg={6} >
										<Row>
											<Col className="text-lg-start pt-1" >
												<Card border='dark' className='p-4'>
													<Card.Subtitle >Description:</Card.Subtitle>
													<Card.Text>{description}</Card.Text>
													<Card.Subtitle>Price:</Card.Subtitle>
													<Card.Text className='text-danger'><strong>₱{price}</strong></Card.Text>
												</Card>
												
												<Form className='mb-3 mt-2' onSubmit={e => getOrder(e, productId)}>
													<Form.Group controlId="productQuantity">
														<Row>
															<Col className='text-end mx-3'>
																<Form.Label>Quantity</Form.Label>
															</Col>
														</Row>
														<Row>
															<Col className='text-end mx-3'>
																<Form.Control 
																type="number" 
																value={quantity} 
																onChange={e=> setQuantity(e.target.value)} 
																required/>
															</Col>
														</Row>
													</Form.Group>
												</Form>
												<Row>
													<Col className='text-end'>
														{ user.id !== null 
															?
															<>
																{ 
																	isActive 
																	?<Button variant="primary" block onClick={() => getOrder(productId)}>Checkout</Button>
																	:<Button variant="primary" type="submit" id="submitBtn" disabled>Checkout</Button>
																}
															</> 
																
															:<Link className="btn btn-primary btn-block" to="/login">Log in to Checkout</Link>
														}
													</Col>
												</Row>
											</Col>
										</Row>
									</Col>
								</Row>								
							</Card.Body>
						</Card>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}