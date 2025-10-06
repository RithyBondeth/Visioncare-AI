import { NavLink } from 'react-router-dom'
import NotFound404Img from '../src/assets/notfound404.png'

export default function NotFound() {
    return (
        <div className="w-screen h-screen flex justify-center items-start">
           <div className="flex flex-col items-center">
                <img src={NotFound404Img} alt="NotFound" height={400} width={400}/>
                <NavLink to="/" className="p-3 text-sm rounded-md text-white bg-primary">Back Home</NavLink>
           </div>
        </div>
    )   
}