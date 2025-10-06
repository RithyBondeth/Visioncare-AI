import { Outlet } from "react-router"
import Navbar from "./components/header/Navbar"
import Footer from "./components/footer/Footer"
import { useAuth } from "./hooks/AuthProvider"
import ScrollProgressBar from "./components/utilities/ScrollProgressBar"

export default function Layout() {
    const { isAuthenticated, token } = useAuth()

    return ( 
        <div>
            <ScrollProgressBar/>
            <Navbar isAuth={isAuthenticated} token={token}/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}