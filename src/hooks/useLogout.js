import React from 'react'
import {Navigate} from "react-router-dom"

export function useLogout() {
  
    function logout(){
        localStorage.removeItem("User")
        window.location.reload()
    }

    return {logout}
}

