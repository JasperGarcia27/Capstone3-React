import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Icons
import { HiArchive } from "react-icons/hi";
import { HiSave } from "react-icons/hi";

export default function ArchiveProduct({product, fetchData, isActive}) {
	console.log(product)

	const archive = (productId) => {
		fetch(`https://csp2test.onrender.com/b10/products/${productId}/archive`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
 
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data !== true) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully disabled'
				})
				fetchData();
 
			}else {
				Swal.fire({
					title: 'Something Went Wrong',
					icon: 'error',
					text: 'Please Try again'
				})
				fetchData();
			}
 
 
		})
	}
 
 
		const activate = (productId) => {
		fetch(`https://csp2test.onrender.com/b10/products/${productId}/activate`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
 
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data !== true) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully enabled'
				})
				fetchData();
			}else {
				Swal.fire({
					title: 'Something Went Wrong',
					icon: 'error',
					text: 'Please Try again'
				})
				fetchData();
			}
 
 
		})
	}

return (
        <>
            {
            	!isActive

            	?
				// ------- Activate Button -------
				['top'].map((placement) => (
					<OverlayTrigger
					key={placement}
					placement={placement}
					overlay={<Tooltip>Activate Product</Tooltip>}>
						<Button variant="success" size="sm" onClick={() => activate(product)}><HiSave/></Button>
					</OverlayTrigger>
				))

            	:
				// ------- Archive Button -------
				['top'].map((placement) => (
					<OverlayTrigger
					key={placement}
					placement={placement}
					overlay={<Tooltip>Archive Product</Tooltip>}>
						<Button variant="danger" size="sm" onClick={() => archive(product)} ><HiArchive/></Button>
					</OverlayTrigger>
				))
            }
        </>
    );
}