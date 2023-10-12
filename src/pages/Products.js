// import coursesData from '../data/coursesData';


import {useEffect, useState, useContext} from 'react';

// UserContext
import UserContext from '../UserContext';

// Components
import UserView from '../events/viewproducts/UserView';
import AdminView from '../events/viewproducts/AdminView';
import ProductCard from '../components/ProductCard';


export default function Products(){

	const { user } = useContext(UserContext);
	const [products, setProducts] = useState([]);
	console.log(products)
	const fetchData = () => {
	    fetch(`https://csp2test.onrender.com/b10/products/allProducts`)
	    .then(res => res.json())
	    .then(data => {
	        
	        console.log(data);
	        setProducts(data);

	    });
	}

	useEffect(() => {fetchData()}, []);



	return(
	    <>
			{
	            (user.isAdmin === true) 
				?<AdminView productsData={products} fetchData={fetchData} />

				:<UserView productsData={products} />
	        }
	    </>
	)
}