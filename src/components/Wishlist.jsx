import { useNavigate} from "react-router-dom";

function Wishlist({wishlist,addtoCart,removefromWishlist}){
    const navigate=useNavigate()
 if (wishlist.length === 0) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

      <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4 max-w-md">
        Your Wishlist is Empty. Start adding products you love.
      </h2>

      <button
        onClick={() => navigate("/")}
        className="text-blue-600 font-medium hover:underline"
      >
        ← Continue Shopping
      </button>

    </div>
  );
}
    return (
        <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                <div className="mb-4 text-left px-2">
                <button
                onClick={() => navigate("/")}
                className="text-blue-600 font-medium hover:underline"
                >
                ← Continue Shopping
                </button>
            </div>
                  {wishlist.map(item=>(
                 <div  className='flex flex-col sm:flex-row gap-4 items-center sm:items-start border-b py-6'key={item.id}>
                    {/* Image */}
                    <div className="flex-1 flex justify-center items-center">
                    <img src={item.image} alt={item.title} className="h-32 w-32 object-contain"></img>
                    </div>

                    <div className="flex flex-col gap-3 flex-1 text-center sm:text-left">
                     <h3 className="text-lg font-semibold max-w-md text-gray-800 hover:text-black transition cursor-pointer">{item.title}</h3>
                    <p className="text-black font-bold">₹ {item.price}</p>

                     <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full sm:w-auto">
                  <button className=' bg-black text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto hover:bg-gray-800 transition' onClick={()=>addtoCart(item)}>Add To Cart</button>
                  <button  className=" border border-gray-400 px-4 py-2 rounded-lg text-sm w-full sm:w-auto hover:bg-gray-100 transition"onClick={()=>removefromWishlist(item.id)}>Remove From Wishlist</button>
                    </div>
                    </div>
                   
                  
                </div>
                  ))}
           </div>
        </div>
    
    )
}
export default Wishlist