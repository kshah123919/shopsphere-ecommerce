import { useNavigate } from "react-router-dom";
function Cart({cart,removefromcart,addtoCart,decreaseqty}){
    const navigate = useNavigate();
if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        
        <h2 className="text-xl font-bold mb-4">
          Cart is empty 🛒
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

  return(
    <div className="max-w-3xl mx-auto p-6 text-center">
        
        <div className="mb-4 text-left">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 font-medium hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">Cart Page</h1>

      {/* container */}
      <div className="flex flex-col gap-6"> 
        
        {cart.map(item =>(
          
          <div
            key={item.id}
            className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full border rounded-lg p-4 shadow bg-white'
          >

            {/* LEFT: image + title */}
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
              <img
                className='w-32 h-32 object-contain'
                src={item.image}
                alt={item.title}
              />
              <p className="text-sm text-center sm:text-left max-w-xs">
                {item.title}
              </p>
            </div>

            {/* RIGHT: price + qty + remove */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              
              {/* price */}
              <p className="font-bold text-lg whitespace-nowrap">
                ₹ {item.price.toFixed(2)}
              </p>

              {/* qty */}
              <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                <button
                  className='px-3 py-1 hover:bg-gray-200 text-lg'
                  onClick={()=>decreaseqty(item)}
                >-</button>

                <span className="px-4 font-semibold">
                  {item.quantity}
                </span>

                <button
                  className='px-3 py-1 hover:bg-gray-200 text-lg'
                  onClick={()=>addtoCart(item)}
                >+</button>
              </div>

              {/* remove */}
              <button
                className='border border-red-400 text-red-500 px-5 py-2 rounded-lg w-full sm:w-auto hover:bg-red-50'
                onClick={()=>removefromcart(item.id)}
              >
                Remove
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-6 max-w-3xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow w-full sm:w-64 sm:ml-auto">
          <h2 className="text-lg font-semibold text-right">
            Total: ₹ {cart.reduce((sum,item)=>sum+item.price*item.quantity,0).toFixed(2)}
          </h2>
        </div>
      </div>

    </div>
  )
}

export default Cart;