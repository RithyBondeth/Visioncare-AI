import { createContext, useContext, useEffect, useState } from "react";

//Create the Context
const AuthContext = createContext()

//Custom hook to use AuthContext
export function useAuth() {
    return useContext(AuthContext)   
}

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(() => localStorage.getItem("token") || null) 

    useEffect(() => {
        //Check if token exists in localStorage
        const savedToken = localStorage.getItem("token")
        if(savedToken) {
            setIsAuthenticated(true)
            setToken(savedToken)   
        }
    },[])

    const login = (newToken) => {
        setIsAuthenticated(true)
        setToken(newToken)
        localStorage.setItem("token", newToken) //Save Login State
    }

    const logout =() => {
        localStorage.removeItem("token") //Clear Login State
        setIsAuthenticated(false)
        setToken(null)
    }

    return <AuthContext.Provider value={{isAuthenticated, login, logout, token}}>{children}</AuthContext.Provider>
}