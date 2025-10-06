import { useState } from "react";
import SlideCard from "./SlideCard";

export default function Slider({slideData}) {

    const [index, setIndex] = useState(0)

    const handleBackSlide = () => {
        if(index > 0 && index < slideData.length - 1) {
            setIndex(index - 1)
        } else if(index === 0) {
            setIndex(slideData.length - 1)   
        } else {
            setIndex(index - 1)
        }
    }

    const handleForwardSlide = () => {
        if(index < slideData.length - 1){
            setIndex(index + 1)
        } else if(index  === slideData.length - 1) {
            setIndex(0)
        }
    }

    return (
        <div className="container pb-4 my-5 relative monitor:w-full">
            <span 
                className="absolute top-1/2 left-3 -translate-y-1/4 p-1 cursor-pointer material-icons hover:text-primary"
                onClick={() => handleBackSlide()}
            >
                arrow_back
            </span>
            <SlideCard 
                image = {slideData[index].image}
                title = {slideData[index].content.title}
                description = {slideData[index].content.description}
            /> 
            <span 
                className="absolute top-1/2 right-1 -translate-y-1/4 cursor-pointer material-icons hover:text-primary" 
                onClick={() => handleForwardSlide()}
            >
                arrow_forward
            </span>
            <div className="flex justify-center items-center absolute bottom-0 left-1/2 -translate-x-1/4">
                {slideData.map((item, i) => <div key={i} className={`h-2 mr-1 rounded-full duration-200 ${i === index ? 'bg-primary w-5' : 'bg-grey dark:bg-darkgray w-2'}`}/>)}
            </div>
        </div>
    )   
}