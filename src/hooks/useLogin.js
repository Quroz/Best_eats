import React, {useState} from 'react'

export function useLogin() {

    const [error, setError] = useState(null)  
    const [isLoading, setIsLoading] = useState(null) 

    async function login(email,password){
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {'Content-Type':'application/json'}
    });
    
        const data = await response.json()

        if(response.status !== 200){
            setIsLoading(false)
            console.log("data", data.Error)
            setError(data.Error)
        }
        else{
            localStorage.setItem("User", JSON.stringify(data))
            setIsLoading(false)
            window.location.reload()
        }
    }  
  return {login,error,isLoading}
}