import React, {useState, useEffect} from 'react'

export function useSignup() {

  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)

  async function signup(email,password){
    
    setIsLoading(true)
    

    const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {"Content-Type": "application/json"}
    })

    const data = await response.json()

    if(response.status !== 200){
        setError(data.Error)
        setIsLoading(false)
    }
    else{
        localStorage.setItem("User", JSON.stringify(data))
        setIsLoading(false)
        window.location.reload()
    }
  }
  
  return {signup, error,isLoading}
}

