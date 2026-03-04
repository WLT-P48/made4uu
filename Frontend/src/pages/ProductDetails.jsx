import { useParams } from "react-router-dom";
import { useState } from "react";

import mug from "../assets/images/coffee-mug.jpg";
import bottle from "../assets/images/steel-bottle.jpg";
import gift from "../assets/images/gift-combo.jpg";
import mala from "../assets/images/digital-mala.png";
import clock from "../assets/images/Luxury-Wall-Clock.jpg";
import vase from "../assets/images/Ceramic-Flower-Vase.jpg";
import plant from "../assets/images/Decorative-Plant-Pot.jpg";
import lamp from "../assets/images/Modern-Table-Lamp.jpg";
import gymbag from "../assets/images/Duffel-Gymbag.jpg";
import smartwatch from "../assets/images/Smart-Watch.jpg";
import earbuds from "../assets/images/wireless-earbuds.jpg";
import headphones from "../assets/images/Head-phones.jpg";
import laptop from "../assets/images/Laptop.jpg";
import speaker from "../assets/images/smart-speaker.jpg";


const productData = [
{ id:1,name:"Aesthetic Coffee Mug",img:mug,price:299,oldPrice:399,rating:4.5,reviews:120,description:"Premium ceramic mug for daily coffee.",stock:12 },
{ id:2,name:"Steel Water Bottle",img:bottle,price:499,oldPrice:699,rating:4.3,reviews:95,description:"Leakproof stainless steel bottle for gym & travel.",stock:8 },
{ id:3,name:"Couple Gift Combo",img:gift,price:899,oldPrice:1199,rating:4.8,reviews:210,description:"Perfect romantic gift combo.",stock:6 },
{ id:4,name:"Digital Mala",img:mala,price:749,oldPrice:999,rating:4.4,reviews:140,description:"Smart digital counter mala.",stock:10 },
{ id:5,name:"Luxury Wall Clock",img:clock,price:1299,oldPrice:1599,rating:4.7,reviews:88,description:"Modern designer wall clock.",stock:4 },
{ id:6,name:"Ceramic Flower Vase",img:vase,price:699,oldPrice:899,rating:4.5,reviews:110,description:"Elegant ceramic vase.",stock:9 },
{ id:7,name:"Decorative Plant Pot",img:plant,price:499,oldPrice:699,rating:4.4,reviews:72,description:"Beautiful decorative plant pot.",stock:7 },
{ id:8,name:"Modern Table Lamp",img:lamp,price:699,oldPrice:899,rating:4.4,reviews:72,description:"Soft ambient modern lamp.",stock:5 },
{ id:9,name:"Duffel Gym Bag",img:gymbag,price:1499,oldPrice:1999,rating:4.4,reviews:64,description:"Spacious duffel bag perfect for gym and travel.",stock:10 },
{ id:10,name:"Smart Watch",img:smartwatch,price:2999,oldPrice:3999,rating:4.6,reviews:120,description:"Smart fitness watch with heart rate monitoring.",stock:15 },
{ id:11,name:"Wireless Earbuds",img:earbuds,price:1999,oldPrice:2599,rating:4.5,reviews:98,description:"High quality wireless earbuds with noise cancellation.",stock:20 },
{ id:12,name:"Wireless Headphones",img:headphones,price:3499,oldPrice:4299,rating:4.5,reviews:85,description:"Premium wireless headphones with deep bass.",stock:14 },
{ id:13,name:"Laptop",img:laptop,price:59999,oldPrice:65999,rating:4.6,reviews:110,description:"High performance laptop for work and study.",stock:6 },
{ id:14,name:"Smart Speaker",img:speaker,price:2999,oldPrice:3499,rating:4.4,reviews:72,description:"Voice assistant smart speaker with powerful sound.",stock:12 }
];

const ProductDetails = () => {

const { id } = useParams();
const [qty,setQty] = useState(1);

const product = productData.find(
(p)=>p.id === parseInt(id)
);

if(!product){
return <div className="flex justify-center items-center h-screen text-xl">Product not found</div>
}

const discount =
product.oldPrice > product.price
? Math.round(((product.oldPrice-product.price)/product.oldPrice)*100)
:0

return (

<div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-10">

<div className="bg-white rounded-3xl shadow-2xl p-10 grid md:grid-cols-2 gap-12 max-w-6xl">

{/* IMAGE */}

<div className="flex justify-center items-center">

<img
src={product.img}
alt={product.name}
className="w-96 object-contain transition duration-500 hover:scale-110"
/>

</div>

{/* DETAILS */}

<div>

<h1 className="text-4xl font-bold text-gray-800">
{product.name}
</h1>

{/* Rating */}

<div className="flex items-center gap-2 mt-2">

<div className="text-yellow-500 text-lg">
⭐ {product.rating}
</div>

<span className="text-gray-500">
({product.reviews} reviews)
</span>

</div>

{/* PRICE */}

<div className="mt-6">

<div className="flex items-center gap-4">

<p className="text-4xl font-bold text-gray-900">
₹{product.price}
</p>

<span className="line-through text-gray-400 text-lg">
₹{product.oldPrice}
</span>

{discount>0 &&( <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg animate-pulse">
{discount}% OFF </span>
)}

</div>

</div>

{/* DESCRIPTION */}

<p className="mt-6 text-gray-600 leading-relaxed">
{product.description}
</p>

{/* STOCK */}

<p className="mt-3 text-green-600 font-semibold">
In Stock ({product.stock} items)
</p>

{/* QUANTITY */}

<div className="flex items-center gap-6 mt-6">

<p className="font-semibold text-gray-700">
Quantity
</p>

<div className="flex items-center border rounded-xl overflow-hidden">

<button
onClick={()=> qty>1 && setQty(qty-1)}
className="px-4 py-2 bg-gray-100 hover:bg-gray-200"

>

*

</button>

<span className="px-6 py-2 font-semibold">
{qty}
</span>

<button
onClick={()=> setQty(qty+1)}
className="px-4 py-2 bg-gray-100 hover:bg-gray-200"

>

*

</button>

</div>

</div>

{/* ADD TO CART */}

<button
className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-xl text-lg shadow-lg hover:scale-105 hover:shadow-xl transition"

>

Add to Cart </button>

{/* EXTRA INFO */}

<div className="mt-8 space-y-2 text-gray-500 text-sm">

<p>🚚 Free delivery within 3-5 days</p>
<p>🔄 Easy 7 days return</p>
<p>🔒 Secure payment</p>

</div>

</div>

</div>

</div>

)

}

export default ProductDetails;
