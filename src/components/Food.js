import React, {useEffect, useState} from 'react'
import {data} from "../data/data.js"

function Food({search}) {

  const [foods, setFoods] = useState(data)

  const user = JSON.parse(localStorage.getItem("User"))

  function filterType(category){
    setFoods(
        data.filter((item) => {
            return item.category === category
        })
    )
  }

  function filterPrice(price){
    setFoods(
        data.filter((item) => {
            return item.price === price
        })
    )
  }


  useEffect(() => {

    setFoods(
        data.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        })
    )

  }, [search])



  async function order(name,category,image){


    const price = Math.floor(Math.random() * (200 - 50 + 1)) + 50;

    const response = await fetch("http://localhost:4000/api/cart/", {
        method: "POST",
        body: JSON.stringify({name,category,image,price}),
        headers: {
            'Content-Type':'application/json',
            "Authorization": `Bearer ${user.token}`
        }
     })
     const data = await response.json()
 

     if(response.status !== 200){
        console.log(data.Error)
     }
     else{
        alert("Your order is completed!")
     }

  }


  return (
    <div className='max-w-[1640px] mx-auto px-4 py-12'>
        <h1 className='text-orange-600 font-bold text-4xl text-center'>Top Rated Menu Items</h1>

        <div className='flex flex-col lg:flex-row justify-between'>
            <div>
                <p className='font-bold text-gray-700'>Filter Type</p>
                <div className='flex justify-between flex-wrap'>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => setFoods(data)}>All</button>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => filterType("burger")}>Burgers</button>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => filterType("pizza")}>Pizza</button>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => filterType("salad")}>Salads</button>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => filterType("chicken")}>Chicken</button>
                </div>
            </div>
            <div>
                <p className='font-bold text-gray-700'>Filter Price</p>
                <div className='flex justify-between max-w-[390px] w-full'>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => filterPrice("$")}>$</button>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => filterPrice("$$")}>$$</button>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => filterPrice("$$$")}>$$$</button>
                    <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' onClick = {() => filterPrice("$$$$")}>$$$$$</button>
                </div>
            </div>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
            {foods.map((item,index) => (
                <div key = {index} className = "relative border shadow-lg hover:scale-105 duration-300 rounded-lg cursor-pointer">
                    <button className='absolute top-2 right-2 p-1 bg-gray-200 text-black rounded-md text-sm hover:bg-orange-500'
                    onClick = {() => order(item.name,item.category,item.image)}
                    >Order</button>
                    <img alt = {item.name} src = {item.image} className = "w-full h-[200px] object-cover rounded-t-lg"/>
                    <div className='flex justify-between px-2 py-4'>
                        <p className='font-bold'>{item.name}</p>
                        <p>
                            <span className='bg-orange-500 text-white p-1 rounded-full'>{item.price}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Food