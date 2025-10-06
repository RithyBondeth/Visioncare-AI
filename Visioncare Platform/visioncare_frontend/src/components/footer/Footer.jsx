import { Link } from "react-router-dom";
import { footerData, VisioncareLogo, titles } from "../../constants/constant";
import FooterList from "./FooterList";

export default function Footer() {
    return (
        <div className="p-5 text-white bg-dark dark:text-darkgray">
            <div className="flex justify-between items-start tablet-md:flex-col tablet-md:items-center">
                <div className="flex flex-col items-center mx-5 tablet-xl:hidden">
                    <img src={VisioncareLogo} height={150} width={150}/>
                    <p className="text-xl mt-2">{titles[0]}</p>
                </div>
                <FooterList label="Explore" list={footerData.explore}/>
                <FooterList label="Discover"list={footerData.discover}/>
                <div className="flex flex-col items-start mx-5 tablet-md:mt-5 tablet-md:w-full">
                    <p className="uppercase tablet-xl:text-sm tablet-lg:text-xs tablet-md:text-lg">Social Media</p>
                    <div className="mt-2">
                    {footerData.social.map((item, index) => (
                        <Link to={item.link} target="_blank" className="mt-2 flex justify-start items-center cursor-pointer tablet-lg:text-xs" key={index}>
                            <img src={item.icon} alt={item.label} height={25} width={25}/>
                            <p className="ml-1 text-sm tablet-xl:text-xs">{item.label}</p>
                        </Link> 
                    ))}
                    </div>
                </div>
                <div className="flex flex-col items-start [&>img]:mt-4 mx-5 tablet-md:mt-5 tablet-md:w-full">
                    <p className="uppercase tablet-xl:text-sm tablet-lg:text-xs tablet-md:text-lg">Get Mobile App</p>
                    <img src={footerData.getmobileappImg} height={50} width={100}/>
                </div>
                <div className="flex flex-col items-start mx-5 tablet-md:mt-5 tablet-md:w-full">
                    <p className="uppercase tablet-xl:text-sm tablet-lg:text-xs tablet-md:text-lg">Address</p>
                    <div className="mt-2 flex flex-col items-start">
                    {footerData.address.map((item, index) => (
                        <div className="flex justify-center items-center mt-1 tablet-lg:text-xs" key={index}>
                            <span className="material-icons tablet-xl:text-sm tablet-lg:text-xs">{item.icon}</span>
                            <p className="text-sm ml-1 tablet-xl:text-sm tablet-lg:text-xs">{item.label}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className="pt-4 mt-4 text-xs text-center border-t-[1px] border-white">{footerData.copyright}</div>
        </div>
    )
}