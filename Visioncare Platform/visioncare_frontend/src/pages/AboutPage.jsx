import SlideCard from "../components/home/SlideCard"
import { AboutusPoster, ourTeamData, slideData } from "../constants/constant"
import RoundButton from "../components/utilities/roundButton"
import { useNavigate } from "react-router"

export default function AboutPage(){

    const navigate = useNavigate()

    return (
        <div>
            {/* Poster Section */}
            <img src={AboutusPoster} alt="aboutus poster" className="h-[400px] w-full mt-1 monitor:h-[600px]"/>
            {/* Info Section */}
            <div className="my-5">
            {slideData.map((item, index) => (
                <SlideCard 
                    image = {item.image}
                    title = {item.content.title}
                    description = {item.content.description}
                    className={`${index%2 !== 0 && 'flex-row-reverse'} [&>img]:w-[35%] [&>div]:w-[65%] px-20`}
                />
            ))} 
            </div>
            {/* Ourteam Section */}
            <div className="flex flex-col items-center bg-grey dark:bg-dark">
                <div className="w-full grid grid-cols-3 place-items-center gap-5 tablet-lg:grid-cols-2 phone-lg:grid-cols-1">
                {ourTeamData.map((item, index) => (
                    <div className="size-[240px] rounded-full my-3 overflow-hidden shadow-lg bg-white dark:bg-dark tablet-md:size-[215px] phone-lg:size-[300px]" key={index}>
                        <div className="w-full h-2/3 bg-top bg-cover bg-no-repeat" style={{backgroundImage: `url(${item.image})`}}/>
                        <div className="w-full h-1/3 text-xs flex flex-col items-center justify-start pt-3 tablet-md:text-[10px] phone-lg:text-sm">
                            <p className="text-md font-bold mb-1">{item.name}</p>
                            <p>{item.position}</p>
                        </div>
                    </div>
                ))}
                </div>
                <div className="mt-7 mb-10">
                    <RoundButton label="Contact Our Team" onClick={() => navigate("/contact")}/>      
                </div>      
            </div>
        </div>
    )
}