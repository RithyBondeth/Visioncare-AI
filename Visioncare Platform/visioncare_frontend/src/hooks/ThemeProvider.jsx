import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    
    // Load the theme from localStorage when the component mounts
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if(savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark')
            setIsDarkMode(true)
        } else {
            document.documentElement.setAttribute('data-theme', 'light') 
            setIsDarkMode(false) 
        }
    }, [])

    // Toggle theme and save in localstorage
    const toggleTheme = () => {
        if(isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
            setIsDarkMode(false)
        } else {
            document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
            setIsDarkMode(true)
        }
    }

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )    
}