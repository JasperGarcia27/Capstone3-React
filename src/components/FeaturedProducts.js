import {CardGroup, Card, Row, Col} from "react-bootstrap";
// import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import PreviewProducts from "./PreviewProducts"

export default function FeaturedProducts() {
	const [previews, setPreviews] = useState([])
	useEffect(() => {
		fetch(`https://csp2test.onrender.com/b10/products/allActiveProducts`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			const numbers = []
			const featured = []

			const generatedRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.length)
				if(numbers.indexOf(randomNum) === -1) {
					numbers.push(randomNum)
				}
				else {
					generatedRandomNums()
				}
			}

			for(let i = 0; i < data.length; i++) {
				generatedRandomNums()
				featured.push(
					<PreviewProducts data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2}/>
				)
			}
			setPreviews(featured)
		})
	}, [])

	return(
		<Row className="mx-5">
			<Col lg={12}>
				<Card border="dark" className="my-5">
					<div className="m-3">
						{/* <h2 className="text-center mb-3">Featured Products</h2> */}
						<CardGroup className="justify-content-start">
							{previews}
						</CardGroup>
					</div>
				</Card>
			</Col>
		</Row>
		
	)
}