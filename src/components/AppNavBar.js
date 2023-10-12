import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link, NavLink} from 'react-router-dom';
import UserContext from '../UserContext';
import {useContext} from 'react';

// Icon
import { FaKitchenSet } from "react-icons/fa6";

// Components
import SearchProductCard from "../components/SearchProductCard"

export default function AppNavbar(){

    const {user} = useContext(UserContext);

	return(
		<Navbar bg="transparent" expand="lg">
	        <Container fluid>
	            <Navbar.Brand as={Link} to="/">SpiceCraft Kitchen <FaKitchenSet className='pb-2'/></Navbar.Brand>
	            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
	            <Navbar.Collapse id="basic-navbar-nav">
	                <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
                        {(user.id !== null) 
							?
							<>
								{(!user.isAdmin) ?
									<>
							
										<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
										<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
									</>
										:
									<>
										{/* <Nav.Link as={NavLink} to="/addProduct">Add Product</Nav.Link> */}
										<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
										<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
									</>	
								}
							</>
							:
							<>
								<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
							</>
						}
						<Nav.Link as={NavLink} exact><SearchProductCard /></Nav.Link>
	                </Nav>
	            </Navbar.Collapse>
	        </Container>
	    </Navbar>
	)
}