import React, {useState} from 'react'
import {useSignup} from "../hooks/useSignup"
import loginBG from "../assets/loginBG.jpeg"
import {Link} from "react-router-dom"

function Signup() {
  const {signup,error,isLoading} = useSignup()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function clickHandler(){
      await signup(email,password)
  }

  console.log("error", error)

  return (
    <div className='w-full h-screen flex justify-center'>
        <img src = {loginBG} alt = "/" className='absolute w-full h-full object-cover'/>
        <div className='w-full max-h-[500px] max-w-[700px] flex flex-col z-20 bg-black/40 text-white mt-16'>
            <h1 className='font-bold text-4xl text-center mt-8'>Signup</h1>
            <div className='flex flex-col mt-8 gap-4 w-[90%] mx-auto'>
              <label>Email:</label>
              <input type = "text" placeholder='' className='bg-gray-200 py-2 w-full border-gray-500 border-[1px] rounded-sm indent-1 text-black'
              value = {email}  onChange = {(e) => setEmail(e.target.value)}
              />
              <label>Password:</label>
              <div>
                <input type = "password" placeholder='' className='bg-gray-200 py-2 w-full border-gray-500 border-[1px] rounded-sm indent-1 text-black'
                value = {password}  onChange = {(e) => setPassword(e.target.value)}
                />
                {error && <h1 className='text-red-500'>{error}</h1>}
              </div>
              <h1 className='flex justify-center gap-1'>Already have a account? Login  <Link to = "/login"> <p className='underline hover:text-gray-300'>here</p></Link></h1>
              <button className='w-[50%] mx-auto bg-orange-500 text-white hover:bg-orange-300 rounded-md border-none py-2'
              onClick = {clickHandler}
              >Signup</button>
            </div>
        </div>
    </div>
  )
}

export default Signup