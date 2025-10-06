export default function ContactCard({ image, label, labelName }) {
    return (
        <div className="py-5 px-10 rounded-xl shadow-lg flex flex-col items-center cursor-pointer border-2 bg-white dark:bg-dark duration-200 hover:scale-105 hover:border-primary">
            <div className="flex flex-col items-center">
                <img src={image} alt={labelName} height={50} width={50}/>
                <p className="text-xs mt-2">{label}</p>
            </div>
            <p className="text-sm mt-2">{labelName}</p>
        </div>
    )   
}

