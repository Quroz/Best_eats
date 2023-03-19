import Navbar from "./components/Navbar";
import HomeRoute from "./routes/HomeRoute"
import AddRecipe from "./routes/AddRecipe";
import AddedRecipes from "./routes/AddedRecipes";
import Login from "./routes/Login"
import Signup from "./routes/Signup"
import Contact from "./routes/Contact";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import React,{useState} from "react"


function App() {

  const loggedIn = localStorage.getItem("User")

  const [search, setSearch] = useState("")



  return (
    <>
      <BrowserRouter>
          <Navbar setSearch = {setSearch}/>
          <Routes>
            <Route path = "/" element = {loggedIn ? <HomeRoute search = {search}/> : <Navigate to = "/login"/>}/>
            <Route path = "/addRecipe" element = {loggedIn ? <AddRecipe/> : <Navigate to = "/login"/>}/>
            <Route path = "/recipes" element = {loggedIn ? <AddedRecipes/> : <Navigate to = "/login"/>}/>
            <Route path = "/login" element = {!loggedIn ? <Login/> : <Navigate to = "/"/>}/>
            <Route path = "/signup" element = {!loggedIn ? <Signup/> : <Navigate to = "/"/>}/>
            <Route path = "/contact" element = {<Contact/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
