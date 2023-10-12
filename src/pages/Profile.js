import {useState, useEffect, useContext} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import UserContext from '../UserContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import UserIcon from '../pictures/icon.png';

// Components
import ResetPassword from '../components/ResetPassword';

export default function Profile(){

    const {user} = useContext(UserContext);

    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`https://csp2test.onrender.com/b10/users/getUserDetails`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(typeof data._id !== "undefined"){
                setDetails(data)
            }
        })
    }, [])

    return (
        (user.access === null) ?
        <Navigate to="/products" />
        :
        <>
            <Col className='my-5' xs={{span:10, offset:1}} lg={{span:4, offset:4}} >
                <Card border='danger' className="cardHighlight mx-2" >
                    <Card.Body>
                        <Row className="text-center">
                            <Col lg={12}>
                                <img src={UserIcon} style={{ width: '80px' }}  alt="Logo" />
                                <Card.Title className='mt-3 mb-0'>{details.email}</Card.Title>
                                <Card.Text>Email</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-center">
                        <ResetPassword />
                    </Card.Footer>
                </Card>
            </Col>


        </>

    )

}

         