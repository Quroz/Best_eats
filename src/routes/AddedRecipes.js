import React, {useState, useEffect} from 'react'
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function AddedRecipes() {


  const [meals, setMeals] = useState([])
  const [editMode, setEditMode] = useState(false)

  const [editName, setEditName] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editPrice, setEditPrice] = useState("")


  const user = JSON.parse(localStorage.getItem("User"))

  useEffect(() => {
    fetch("http://localhost:4000/api/recipe/", {
      method: "GET",
      headers: {
        'Content-Type':'application/json',
        "Authorization": `Bearer ${user.token}`
    }
    })
      .then((response) => response.json())
      .then((data) => {
        setMeals(data)
      }).catch((e) => {
        console.log(e)
      });
  }, []);

 


  async function deleteHandler(id){

  
    const response = await fetch(`http://localhost:4000/api/recipe/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    })
    const data = await response.json()
    if(response.status !== 200){
      alert(data.Error)
    }
    else{
      setMeals(meals => meals.filter((item) => item._id !== id))
  }
  }

  async function editHandler(id){

    
    setEditMode(!editMode)

    console.log("name", editName)
    console.log("cateogry", editCategory)
    console.log("price", editPrice)

    const response = await fetch(`http://localhost:4000/api/recipe/${id}`, {
      method: "PUT",
      body: JSON.stringify({"name": editName, "category": editCategory, "price": editPrice}),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${user.token}`
        }
    })
    console.log("data", response)
    const data = await response.json()

    if(response.status !== 200){
      console.log("Error:", data.Error)
    }
    else{
      alert("success")
      window.location.reload()
    }

  }
  

  return (
    <div className='w-full mt-12 min-h-screen p-4'>
      <h1 className='text-4xl font-bold text-orange-500 text-center'>My meals</h1>
      <div className='grid md:grid-cols-4 grid-rows-none gap-6 mt-12'>
        {meals.map((item,index) => (
            <div key = {index} className = "border shadow-lg hover:scale-105 duration-300 rounded-lg cursor-pointer h-full relative">
                <div className='absolute right-4 top-4 flex items-center gap-2'>
                    {editMode ? <AiFillCheckCircle size = {25} className = "cursor-pointer text-green-500 hover:text-green-300"
                    onClick = {() => editHandler(item._id)}
                    /> : <AiFillEdit size = {25} className = "cursor-pointer hover:text-gray-500"
                    onClick = {() => setEditMode(!editMode)}
                    />}
                    {editMode ? <AiOutlineClose size = {25} className='cursor-pointer text-red-500 hover:text-red-300'
                    onClick = {() => setEditMode(!editMode)}
                    />: <AiFillDelete size = {25} className='cursor-pointer text-red-500 hover:text-red-400' onClick = {() => deleteHandler(item._id)}/>}
                </div>
                <img alt = {item.name} src = {item.image} className = "w-full h-[200px] object-cover rounded-t-lg"/>
                <div className='flex flex-col xl:flex-row justify-between px-2 py-4 relative items-center gap-2'>
                    {editMode ? <input onChange = {e => setEditName(e.target.value)} placeholder = "Edit name..." className = "py-1 bg-gray-200 rounded-md w-full xl:w-[100px] indent-1 text-sm"/> : <p className='font-bold'>{item.name}</p>}
                    {editMode ? <input onChange = {e => setEditCategory(e.target.value)} placeholder = "Edit category..." className = "py-1 bg-gray-200 rounded-md w-full xl:w-[100px] indent-1 text-sm"/> : <p>{item.category}</p>}
                    {editMode ? <select className=' rounded-md border-[1px] border-gray-500 indent-1 text-black w-full xl:w-[100px]'
                        onChange = {e => setEditPrice(e.target.value)}
                        >
                            <option>Edit price</option>
                            <option>$</option>
                            <option>$$</option>
                            <option>$$$</option>
                        </select> : (<p>
                        <span className='bg-orange-500 text-white p-1 rounded-full'>{item.price}</span>
                    </p>)}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default AddedRecipes