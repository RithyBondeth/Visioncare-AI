export default function FooterList(props) {
    return (
        <div className="flex flex-col items-start mx-5 tablet-md:mt-5 tablet-md:w-full">
            <p className="uppercase tablet-xl:text-sm tablet-lg:text-xs tablet-md:text-lg">{props.label}</p>
            <div className="mt-2">
            {props.list.map((item,index) => (
                <div key={index} className="mt-1 text-sm tablet-lg:text-xs tablet-md:text-md">{item}</div>  
            ))}
            </div>
        </div>
    )   
}