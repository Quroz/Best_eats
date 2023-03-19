import React, {useState, useEffect} from 'react'
import CartItem from './CartItem'

function Cart() {


  const [cart, setCart] = useState([])
  const user = JSON.parse(localStorage.getItem("User"))

  useEffect(() => {
    
       fetch("http://localhost:4000/api/cart/", {
        method: "GET",
        headers: {
            'Content-Type':'application/json',
            "Authorization": `Bearer ${user.token}`
        }
        }).then((response) => response.json())
        .then((data) => {
            setCart(data)
            
        }).catch((e) => {
            console.log(e)
        })
   
  }, [])

  return (
    <div className='bg-gray-200 w-full h-full  overflow-y-scroll'>
        {cart.cartItems?.map((item) => (
            <CartItem
             key = {item._id}
             data = {item}
            />
        ))}
        <div className='sticky bottom-0 h-12  w-full bg-gray-300 flex items-center justify-around'>
            {cart !== [] ? <h1 className=''>Total price: {cart?.totalPrice?.[0]?.totalPrice} kr</h1> : "" }
            <button className='p-1 hover:bg-black hover:text-white text-sm'>To payment</button>
        </div>
    </div>
  )
}

export default Cart