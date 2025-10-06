import { motion } from "framer-motion"
import { useNavigate } from "react-router"

export default function NewsCard({image, title, description}) {
    const navigate = useNavigate()

    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            onHoverStart={e => {}}            
            onHoverEnd={e => {}}
            className="min-w-[250px] m-3 rounded-lg overflow-hidden shadow-md cursor-pointer bg-grey dark:bg-dark dark:shadow-2xl"
            onClick={() => navigate("/news")}
        >   
            <div className="h-[150px] w-full bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url(http://127.0.0.1:8000${image})`}}/>
            <div className="w-full flex flex-col justify-start py-3 px-4">
                <p className="text-sm font-bold line-clamp-2">{title}</p>
                <p className="text-xs mt-2 line-clamp-4">{description}</p>
            </div>
        </motion.div>
    )  
}