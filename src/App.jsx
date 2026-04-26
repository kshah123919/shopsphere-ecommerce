import { useState,useEffect } from 'react'
import './App.css'
import {Routes,Route,useNavigate} from "react-router-dom"
import ProductDetails from './components/ProductDetails';
import Navbar from "./components/Navbar";
import Cart from "./components/Cart"
import Wishlist from './components/Wishlist';
function App() {
  
const [products,setProducts]=useState([])
const [search,setSearch]=useState("")
const [loading,setLoading]=useState(true)
const [cart,setCart]=useState(()=>{
  const savedcart=localStorage.getItem("cart") 
  return savedcart ? JSON.parse(savedcart) :[]
})

useEffect(()=>{
  localStorage.setItem("cart",JSON.stringify(cart)) //whenever cart changes save it
},[cart])

const[wishlist,setwishlist]=useState(()=>{
  const savedwishlist=localStorage.getItem("wishlist")//whenever wishlist changes save it
  return savedwishlist ? JSON.parse(savedwishlist) :[]
})
useEffect(()=>{
  localStorage.setItem("wishlist",JSON.stringify(wishlist))
},[wishlist])

const navigate=useNavigate()
const [category,setCategory]=useState("all");
const [message,setMessage]=useState("")
const[sort,setSort]=useState("");

const url="https://fakestoreapi.com/products"

useEffect(()=>{
  setLoading(true)
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    setTimeout(()=>{
      setProducts(data)
    setLoading(false)
    },500)
    
  })
},[])

useEffect(()=>{
  console.log("Cart Updated:",cart);
},[cart])

const addtoCart=(product)=>{    //Add to cart 
  setCart(prev=>{
    const existsprod=prev.find(item=>item.id===product.id)
    if(existsprod){
      return prev.map(item=>{
        if(item.id===product.id) {
          return {...item,quantity:(item.quantity||1)+1} 
         }
        else {
          return item
        }
      })
    }
    return [...prev,{...product,quantity:1}]
  })
}
const decreaseqty=(product)=>{
setCart(prev=>{
  return prev.map(item=>{
    if(item.id===product.id){
      if(item.quantity>1){
        return {...item,quantity:item.quantity-1}
      } else {
          return null
      }
    }
    return item
  }).filter(item => item !==null)
})
}
const removefromcart=(id)=>{
setCart(prev=>prev.filter(item=>item.id!=id))
}
const addwishlist=(product)=>{
    setwishlist(prev=>{
      const exists=prev.find(item=>item.id===product.id)//it doesnt wishlist same item
      if(exists){
        setMessage("Already in Wishlist ❤️ ")
        return prev;
      }
      setMessage("Added in Wishlist ❤️ ");
      
      return [...prev,product]
    })
    setTimeout(()=>{
      setMessage("")
    },2000)
}
const removefromWishlist=(id)=>{
  setwishlist(prev=>prev.filter(item=>item.id!=id))
}
if(loading){
  return(
  <div className='min-h-screen flex items-center justify-center' >
    <div  className='animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black'>

    </div>
    <p className='text-lg  font-semibold'> Loading Products...</p>
    </div>
  )
  
}
const filteredProducts=products.filter(product=>{
          const matchsearch=product.title.toLowerCase().includes(search.toLowerCase()) //Filter Logic
          const matchcategory=category==="all" || product.category===category 
          return matchcategory && matchsearch 
          })
          .sort((a,b)=>{
            if(sort==="low"){
              return a.price-b.price
            }
            else if(sort==="high"){
              return b.price-a.price
            }
            else{
              return 0;
            }
          })
return (
 <div className='min-h-screen bg-gray-100'>
 <Navbar cart={cart} wishlist={wishlist} setSearch={setSearch}/>
 
 {message && (
  <div className='fixed top-20 right-5 bg-black text-white px-4 py-2 rounded-lg'>{message}</div>
 )}
  <Routes>

    {/* HOME PAGE */}
    <Route path="/" element={
      <div className='max-w-7xl mx-auto p-6 text-center'>
       

        
        <div className='flex flex-wrap justify-center gap-4 mb-6 '>
          <button  className='px-4 py-2 border rounded-full hover:bg-black hover:text-white transition'onClick={()=>setCategory("all")}>All</button>
          <button className='px-4 py-2 border rounded-full hover:bg-black hover:text-white transition' onClick={()=>setCategory("jewelery")}>Jewelery</button>
          <button className='px-4 py-2 border rounded-full hover:bg-black hover:text-white transition' onClick={()=>setCategory("women's clothing")}>Women's Clothing</button>
          <button  className='px-4 py-2 border rounded-full hover:bg-black hover:text-white transition'onClick={()=>setCategory("electronics")}>Electronics</button>

                    <div className='relative'>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className='px-4 py-2 border rounded-full bg-transparent hover:bg-black hover:text-white transition cursor-pointer appearance-none'
                  >
                    <option value="">Sort: Default</option>
                    <option value="low">Price: Low → High</option>
                    <option value="high">Price: High → Low</option>
                  </select>
              </div>
          
        </div>
        {/* Product count showing */}
        <p className='text-gray-500 font font-medium text-center mb-4'> Showing {filteredProducts.length} {filteredProducts.length===1 ? "Product": "Products"}</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center'>

          
          {filteredProducts.map(product=>{
            return (
              <div
                className='border border-black rounded-xl shadow-md w-64 p-4 flex flex-col items-center text-center'
                key={product.id} 
              >

                <img
                  className='w-full h-40 object-contain cursor-pointer'
                  src={product.image}
                  alt={product.title}
                  onClick={()=>navigate(`/product/${product.id}`)}
                />

                <p className='mt-2'>{product.title}</p>
                
                <p className='font-bold mt-2 text-lg'>₹ {product.price.toFixed(2)}</p>

                <div className='text-yellow-500 flex gap-1'>
                  {"⭐".repeat(Math.floor(product.rating.rate))}
                  {"☆".repeat(5 - Math.floor(product.rating.rate))}
                </div>

                <p className='text-gray-500 mt-2'>{product.category}</p>
                 
                 <div className='flex items-center gap-3 w-full mt-3'>
                <button
                  className='mt-3 bg-black text-white py-2 rounded-lg'
                  onClick={(e)=>{
                    e.stopPropagation()
                    addtoCart(product)
                  }}
                >
                  Add To Cart
                </button>

                <button className='mt-2 border py-2 rounded-lg hover:bg-red-100 transition flex' onClick={(e)=>{
                  e.stopPropagation()
                  addwishlist(product)
                }}>❤️ Wishlist</button>
                 </div>

              </div>
            )
          })}
          

        </div>
      </div>
    } />

    {/* DETAILS PAGE */}
    <Route path="/product/:id" element={
      <ProductDetails products={products} addtoCart={addtoCart}/>

     
    } />

    <Route path="/cart" element={
      <Cart cart={cart} addtoCart={addtoCart} removefromcart={removefromcart} decreaseqty={decreaseqty}/>
    }/>
  
  <Route path="/wishlist" element={
   <Wishlist wishlist={wishlist} addtoCart={addtoCart} removefromWishlist={removefromWishlist}
  />
  }/>
  </Routes>
  </div>
)

}

export default App