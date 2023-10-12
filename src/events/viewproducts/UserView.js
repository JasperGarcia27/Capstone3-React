import React, { useState, useEffect } from 'react';

import ProductSearch from '../ProductSearch';

// Components
import ProductCard from '../../components/ProductCard';
import Footer from  '../../components/Footer'
import FeaturedProducts from '../../components/FeaturedProducts';


export default function UserView({productsData}) {
    console.log(productsData, "products")
    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {
            
            if(product.isActive === true) {
                return (
                    <ProductCard productProp={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })

        //set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
        setProducts(productsArr)

    }, [productsData])

    return(
        <>
            {/* <ProductSearch /> */}
            { products }
            <Footer />
            {/* <FeaturedProducts /> */}
        </>
        )
}
