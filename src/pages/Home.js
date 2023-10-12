// Components
import Banner from '../components/Banner';
import Highlights from '../components/Higlights';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from  '../components/Footer'

export default function Home(){
	
	const data = {
        title: "SpiceCraft Kitchen",
        content: "Delicious Delivered: Your Culinary Adventure Starts Here.",
        destination: "/products",
        label: "Buy now!"
    }

	return(
		<>
			<Banner data={data} />
			<Highlights />	
			<FeaturedProducts />
			<Footer />
					
		</>
	)
}
