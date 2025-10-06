import { useEffect, useState } from "react";
import { motionButton, navbarData, VisioncareLogo, titles } from "../../constants/constant";
import { motion } from "framer-motion";
import TitleTransition from "../utilities/TitleTransition";
import Drawer from "./Drawer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Theme from "../utilities/Theme";
import { useAuth } from "../../hooks/AuthProvider";
import useFetch from "../../hooks/UseFetch";
import { getProfileApi } from "../../api/api";

export default function Navbar(props) {
    const [user, setUser] = useState({})
    const location = useLocation()
    const navigate = useNavigate()
    let { token } = useAuth()
    
    const { data } = useFetch(getProfileApi, "GET", null, token)
   
    useEffect(() => {
        if(data) setUser(data)  
    },[data])

    return (
        <div className="flex justify-between items-center shadow-md px-4 phone-xl:flex-col phone-xl:py-4">
            <div className="flex justify-center items-center p-2 phone-xl:mb-4">
                <NavLink to="/">
                    <img src={VisioncareLogo} alt="VisionCareAI Logo" height={80} width={80}/>
                </NavLink>
                <div className="h-[50px] w-[2px] mr-2 ml-1 bg-primary"/>
                <TitleTransition titles={titles}/>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center mr-5 tablet-xl:hidden">
                    {navbarData.map((item, index) => (
                        <NavLink 
                            to={item.link} 
                            key={index}
                            className={({ isActive }) => `mx-2 text-sm cursor-pointer uppercase group ${isActive && "text-blue-500"}`}
                        >
                            <p className="group-hover:text-primary">{item.label}</p>
                            <div className={`h-[2px] w-0 group-hover:w-full duration-300 ${location.pathname === item.link ? "w-full" : "w-0 group-hover:w-full"} [&:not(:hover)]:duration-300 bg-primary`}/>
                        </NavLink>
                    ))}
                </div>
                <div className="flex justify-center items-center">
                    {props.isAuth ? 
                    <NavLink to="/profile" className="flex justify-center items-center mr-2 cursor-pointer text-primary phone-lg:hidden">
                        <div 
                            className="size-14 m-2 rounded-full bg-center bg-cover bg-no-repeat bg-sliver"
                            style={{backgroundImage: `url(http://0.0.0.0:8000${user.profile})`}}
                        />
                        <p className="text-md font-semibold ml-1">{user?.first_name || "Name"}</p>
                    </NavLink>
                    : <motion.button 
                        className="px-4 py-2 text-sm rounded-md cursor-pointer border-2 border-primary text-primary hover:bg-primary hover:text-white" 
                        whileHover={motionButton.whileHover}
                        whileTap={motionButton.whileTap}
                        onClick={() => navigate("/login")}
                      >
                        Login
                    </motion.button>}
                    <Theme/>
                    <Drawer/>
                </div>
            </div>
        </div>
    )
}