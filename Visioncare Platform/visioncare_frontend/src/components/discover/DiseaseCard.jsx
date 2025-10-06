import { motion } from "framer-motion"
import RoundButton from "../utilities/roundButton"

export default function DiseaseCard({ image, title, description, key, onClick }) {
    return (
        <motion.div 
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="w-full rounded-xl overflow-hidden flex justify-center items-stretch shadow-lg cursor-pointer dark:bg-dark"
            data-tip="hello"
            key={key}
            onClick={onClick}
        >
            <div className="w-1/2 p-3">
                <img src={image} alt={title} className="w-full h-full rounded-xl"/>
            </div>
            <div className="w-1/2 p-3 flex flex-col items-start">
                <p className="font-medium pt-2 text-lg">{title}</p>
                <p className="text-xs mt-2 leading-5">{description}</p>
                <div className="w-full flex justify-start mt-5">
                    <RoundButton label="Learn More" className="text-xs rounded-lg"/>
                </div>
            </div>
        </motion.div>
    )
}