import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

// Components
import ProductCard from '../components/ProductCard';



const ProductSearch = () => {
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);

const handleSearch = async () => {
    try {
      const response = await fetch(`https://csp2test.onrender.com/b10/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div className='container'>
        <div className="form-group mx-lg-5">
            <label htmlFor="productName">Product Name:</label>
            <Row>
                <Col className='col-6'>
                    <input
                        type="text"
                        id="productName"
                        className="form-control"
                        value={searchQuery}
                        onChange={event => setSearchQuery(event.target.value)}
                    />
                </Col>
                <Col className='col-6'>
                    <Button variant="dark" size='md' onClick={handleSearch}>Search</Button>
                </Col>
            </Row>
            
        </div>
        
        {/* <SearchProductCard /> */}
        
        <div className='mx-5'>
            {searchResults.map(product => (
                <ProductCard productProp={product} key={product._id}/>
            ))}
        </div>
    </div>
  );
};

export default ProductSearch;