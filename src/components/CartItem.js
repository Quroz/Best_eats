import React from 'react'
import {AiOutlineClose} from "react-icons/ai"

function CartItem({data}) {

const user = JSON.parse(localStorage.getItem("User"))

async function deleteHandler(){
    const response = await fetch(`http://localhost:4000/api/cart/${data._id}`, {
        method: "DELETE",
        headers: {
            'Content-Type':'application/json',
            "Authorization": `Bearer ${user.token}`
        }
    })

    const respData = await response.json()

    if(response.status !== 200){
        console.log(respData.Error)
    }
    else{
        window.location.reload()
    }
    
}


  return (
    <div className='w-full flex justify-around items-center border-b-[1px] border-gray-500 p-4'>
            <img alt = "/" src = {data.image} className = "object-cover w-[50px] h-[50px] rounded-full"/>
            <div className='flex flex-col w-[200px] items-center'>
                <div className='flex flex-col items-center'>
                    <h1>{data.name}</h1>
                    <h1>{data.category}</h1>
                </div>
                <h1>{data.price} kr</h1>
            </div>
            <AiOutlineClose size = {20} className = "text-red-500 cursor-pointer hover:text-red-300"
            onClick = {deleteHandler}
            />
    </div>
  )
}

export default CartItem