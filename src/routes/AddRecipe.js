import React, {useState} from 'react'
import loginBG from "../assets/loginBG.jpeg"

function RecipeRoute() {


  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")

  const [error, setError] = useState(null)

  const user = JSON.parse(localStorage.getItem("User"))

  async function clickHandler(){
     const response = await fetch("http://localhost:4000/api/recipe/", {
        method: "POST",
        body: JSON.stringify({name,category,image,price}),
        headers: {
            'Content-Type':'application/json',
            "Authorization": `Bearer ${user.token}`
        }
     })

     const data = await response.json()

     if(response.status !== 200){
        setError(data.Error)
        console.log(data.Error)
     }
     else{
        localStorage.setItem("Recipe", JSON.stringify(data))
        window.location.reload()
     }
  }

  

  return (
    <div className='w-full h-screen flex flex-col items-center bg-red-500 mt-12 max-w-[700px] mx-auto gap-12'>
            <img src = {loginBG} alt = "/" className='absolute w-full h-full object-cover'/>
            <div className='z-20 w-full flex flex-col items-center mt-16 bg-black/40 p-8 h-[550px] text-white'>
                <h1 className='font-bold text-4xl'>Add a meal</h1>
                <div className='w-full flex flex-col gap-4 items-center'>
                    <div className='flex flex-col w-[80%] gap-2'>
                        <label className='self-start'>Name:</label>
                        <input type = "text" className='py-2 rounded-md border-[1px] border-gray-500 indent-1 text-black'
                        value = {name} onChange = {e => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-[80%] gap-2'>
                        <label className='self-start'>Category:</label>
                        <input type = "text" className='py-2 rounded-md border-[1px] border-gray-500 indent-1 text-black'
                        value = {category} onChange = {e => setCategory(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-[80%] gap-2'>
                        <label className='self-start'>Image url:</label>
                        <input type = "text" className='py-2 rounded-md border-[1px] border-gray-500 indent-1 text-black'
                        value = {image} onChange = {e => setImage(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-[80%] gap-2'>
                        <label>Price:</label>
                        <select className='py-2 rounded-md border-[1px] border-gray-500 indent-1 text-black'
                        onChange = {e => setPrice(e.target.value)}
                        >
                            <option>--Please choose an price tag</option>
                            <option>$</option>
                            <option>$$</option>
                            <option>$$$</option>
                        </select>
                    </div>
                    <button className='w-[50%] mx-auto bg-orange-500 text-white hover:bg-orange-300 rounded-md py-2 border-none'
                    onClick = {clickHandler}>Add meal</button>
                    {error && 
                    <div className='w-[50%] mx-auto bg-red-200/70 text-white border-[1px] border-red-900 rounded-md py-2'>
                            <h1 className='text-red-900 text-center'>{error}</h1>
                    </div>
                    }
                </div>
            </div>
    </div>
  )
}

export default RecipeRoute;