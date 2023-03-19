import React, {useState} from 'react'
import {AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag} from "react-icons/ai"
import {BsFillCartFill, BsFillSaveFill} from "react-icons/bs"
import {TbTruckDelivery} from "react-icons/tb"
import {FaUserFriends, FaWallet} from "react-icons/fa"
import {MdFavorite, MdHelp} from "react-icons/md"
import {Link} from "react-router-dom"
import {useLogout} from "../hooks/useLogout"
import Cart from "./Cart"




function Navbar({setSearch}) {

  const [nav, setNav] = useState(false)
  const [cart, setCart] = useState(false)
  const {logout} = useLogout()
  


  const loggedIn = localStorage.getItem("User")
  let email = ""
  
  if(loggedIn){
    email =  JSON.parse(localStorage.getItem("User")).email
  }

  function logoutHandler(){
    logout()
  }

  

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
       
        <div className='flex items-center'>
            <div className='cursor-pointer' onClick = {() => setNav(!nav)}>
                <AiOutlineMenu size = {30}/>
            </div>
            <Link to = "/"><h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>Best <span className='font-bold'>Eats</span></h1></Link>
            <div className='hidden lg:flex items-center bg-gray-200 rounded-full py-1 text-[14px]'>
                <p className='bg-black text-white rounded-full p-2'>Delivery</p>
                <p className='p-2'>Pickup</p>
            </div>
        </div>

        {loggedIn && <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
            <AiOutlineSearch size = {25}/>
            <input type = "text" placeholder='Search foods' className='bg-transparent p-2 focus:outline-none w-full'
            onChange = {(e) => setSearch(e.target.value)}
            />
        </div> }

        <div className='flex flex-row items-center gap-4'>
            {loggedIn ?
             <div className='flex items-center gap-4'>
                <h1>{email}</h1>
                <button onClick = {logoutHandler} className = "hover:bg-black hover:text-white">Log out</button>
             </div> : (
                <>
                    <Link to = "/login"><h1 className='cursor-pointer hover:text-gray-700 text-md'>Login</h1></Link>
                    <Link to = "/signup"><h1 className='cursor-pointer hover:text-gray-700 text-md'>Sign up</h1></Link>
                </>
            )}
            <button className='bg-black text-white hidden md:flex items-center py-2 rounded-full'
            onClick = {() => setCart(!cart)}
            >
                <BsFillCartFill size = {20} className = "mr-2"/> Cart
            </button>
        </div>

        <div className= {nav ? 'bg-black/80 fixed w-full h-full z-10 top-0 left-0' : "hidden"}/>
        <div className= {cart ? 'bg-black/80 fixed w-full h-full z-10 top-0 left-0' : "hidden"}/>

        <div className= {nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300': 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300' }>
            <AiOutlineClose size = {30} className = "absolute right-4 top-4 cursor-pointer" onClick = {() => setNav(!nav)}/>
            <h1 className='text-2xl p-4'>Best <span className='font-bold'>Eats</span></h1>
            <nav>
                <ul className='flex flex-col p-4 text-gray-800' onClick = {() => setNav(!nav)}>
                    <Link to = "/addRecipe"><li className='text-xl py-4 flex'><TbTruckDelivery size = {25} className = "mr-4"/>Add meals</li></Link>
                    <Link to = "/recipes"><li className='text-xl py-4 flex'><MdFavorite size = {25} className = "mr-4"/>My meals</li></Link>
                    <li className='text-xl py-4 flex'><FaWallet size = {25} className = "mr-4"/>Wallet</li>
                    <li className='text-xl py-4 flex'><MdHelp size = {25} className = "mr-4"/> Help</li>
                    <li className='text-xl py-4 flex'><AiFillTag size = {25} className = "mr-4"/>Promotion</li>
                    <li className='text-xl py-4 flex'><BsFillSaveFill size = {25} className = "mr-4"/>Best ones</li>
                    <Link to = "/contact"><li className='text-xl py-4 flex'><FaUserFriends size = {25} className = "mr-4"/>Contact us</li></Link>
                </ul>
            </nav>
        </div>

        <div className= {cart ? "fixed right-0 top-[11.5%] bg-white z-10 ease-in duration-300 w-[300px] h-[500px] rounded-md" : "rounded-md fixed right-[-100%] top-0 bg-white z-10 ease-in duration-300 w-[300px] h-[300px]"}>
                <div className='relative w-full py-2 bg-gray-300'>
                     <AiOutlineClose size = {20} className = "absolute right-4 top-2 cursor-pointer" onClick = {() => setCart(!cart)}/>
                     <h1 className='text-black text-lg text-center'>Your cart</h1>
                </div>
                <Cart/>
        </div>
    </div>
  )
}

export default Navbar