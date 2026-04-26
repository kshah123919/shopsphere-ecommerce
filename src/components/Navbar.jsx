import { useNavigate ,Link} from "react-router-dom"
function Navbar({cart,wishlist,search,setSearch}){
    const navigate=useNavigate()
    return (
       <div className="bg-white shadow-md p-4">
   <div className="flex justify-between items-center ">
    <h1  className='text-2xl font-bold cursor-pointer'>ShopSphere</h1>
    
   <div className="flex items-center gap-3 text-sm"> 
    <div className='cursor-pointer font-semibold'onClick={()=>navigate("/cart")}>
      🛒 Cart({cart.length})
    </div>
    <div className="cursor-pointer font-semibold" onClick={()=>navigate("/wishlist")}>❤️ Wishlist({wishlist.length})</div>

</div>

       </div>
       
    <div className="mt-3"> 
<input
          className='border px-4 py-2 rounded-lg w-full  text-black '
          type="text"
          value={search}
          placeholder='Search Products...'
          onChange={(event)=>{
            setSearch(event.target.value)
          }}
        />
    </div>

    
{/* cart and wishlist is on right side */}

   </div>
    )
}
export default Navbar