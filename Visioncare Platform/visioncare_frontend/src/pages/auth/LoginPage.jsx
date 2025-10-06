import { useState } from "react"
import VisioncareLogo from "../../assets/logo/visioncareai-logo.png"
import useFetch from "../../hooks/UseFetch"
import { loginApi } from "../../api/api"
import axios from "axios"
import { useAuth } from "../../hooks/AuthProvider"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
import RoundButton from "../../components/utilities/roundButton"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false) 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()
    
    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(loginApi, { email: email, password: password })
            const token = response.data.token

            //Save token in to localStorage
            localStorage.setItem("token", token)

            //Save token using login function from context
            login(token)
            toast.success(response.data.message)
            navigate("/")
        } catch(error) {
            toast.error("Login Unsuccessfully!")
        }
    }  

    const { isAuthenticated } = useAuth()
    const visitAsGuest = () => {
        toast.success("Join As Guest Successfully")
        navigate("/")
    }  

    return (
        <form className="h-screen w-full flex" onSubmit={handleLogin}>
            <div className="h-full w-1/2 flex justify-center items-center"> 
                <div className="flex flex-col items-center">
                    <img src={VisioncareLogo} alt="VisioncareAI Logo" className="w-1/2"/>
                    <p className="text-5xl mt-5 font-bold text-primary">VisionCare AI</p>
                    <p className="text-md mt-5 text-primary">Your eyes deserve the best</p>
                </div>
            </div>
            <div className="h-full w-1/2 flex justify-center items-center bg-primary dark:bg-white">
                <div className="w-2/3 px-10 py-7 flex flex-col items-center rounded-lg bg-white dark:bg-dark">
                    <p className="text-xl font-medium ">Welcome, VisionCare AI</p>
                    <div className="w-full mt-5">
                        <label htmlFor="email" className="text-sm">Email</label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                            <span className="material-icons">email</span>
                            <input type="text" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                    </div>
                    <div className="w-full mt-5">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <label className="input input-bordered flex items-center gap-2 mt-1" onChange={(e) => setPassword(e.target.value)}>
                            <span className="material-icons">lock</span>
                            <input type={showPassword ? "text" : "password"} className="grow" placeholder="Password"/>
                            <span className="material-icons" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "visibility_off" : "visibility"}</span>
                        </label>
                    </div>
                    <button type="submit" className="w-full mt-7 p-2 rounded-lg border-2 border-primary text-white bg-primary duration-200 hover:scale-105 hover:bg-white hover:text-primary dark:hover:bg-dark">Login</button>
                    {!isAuthenticated && <div 
                        className="w-full flex justify-center items-center mt-5 p-2 cursor-pointer rounded-lg border-2 border-primary text-white bg-primary duration-200 hover:scale-105 hover:bg-white hover:text-primary dark:hover:bg-dark"
                        onClick={visitAsGuest}
                    >
                        <span className="material-icons mr-1">person</span>
                        <p>Visit as a guest</p>
                    </div>}
                    <div className="mt-5">
                        <p className="text-sm">New to Visioncare AI? <NavLink to="/register" className="cursor-pointer text-primary">Regitser Here</NavLink></p>
                    </div>
                </div>
            </div>
        </form>
    )
}