import { useParams,useNavigate, Navigate } from "react-router-dom";


function ProductDetails({products,addtoCart}) {
    const {id} =useParams()
    const navigate=useNavigate()
const product=products.find(p=>p.id===Number(id))
if(!product){
    return <h2>Loading...</h2>
}

return (
  <div className="bg-gray-100 flex justify-center items-center min-h-screen" >
   <div className="bg-white shadow-xl rounded-xl flex p-8 max-w-5xl  w-full gap-10 ">

    <div className="flex-1 flex justify-center items-center">
        <img src={product.image} alt={product.title} className="h-80 object-contain"></img>
    </div>

    {/* right side details */}
    <div className="flex-1 ">
        <h1 className="text-2xl font- text-gray-800">{product.title}</h1>
        <p className="text-xl font-semibold text-green-600 mt-2"> ₹ {product.price.toFixed(2)}</p>

        {/* rating */}
        <div className='text-yellow-500 mt-2 text-lg'>
                  {"⭐".repeat(Math.floor(product.rating.rate))}
                  {"☆".repeat(5 - Math.floor(product.rating.rate))}
            </div>

            <p className="text-gray-500 mt-2">{product.category}</p>
            <p className="mt-4 text-gray-700 text-sm leading-relaxed">{product.description}</p>

           {/* Buttons */}
            <div className="flex gap-4 mt-6">
                <button className=' bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition' onClick={()=>addtoCart(product)}>Add To Cart</button>
           <button  className=" border px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition"onClick={()=>navigate("/")}>Back</button>
            </div>
            
        </div>
     </div>
  </div>
)
}
export default ProductDetails