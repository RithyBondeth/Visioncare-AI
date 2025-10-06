export default function NewsBigCard({ image, title, description, author }) {
    return (
        <div className="container h-[280px] flex items-stretch ">
            <div className="w-[35%] my-4 mr-2 ml-0 rounded-lg bg-center bg-cover bg-no-repeat tablet-xl:hidden" style={{backgroundImage: `url(http://127.0.0.1:8000${image})`}}/>
            <div className="w-[65%] my-4 ml-2 mr-0 flex flex-col justify-between tablet-xl:w-full">
                <div>
                    <div className="text-sliver text-xs">
                        <p className="p-2 w-fit rounded-lg border-[1px] border-sliver">{author.split("-")[0]}</p> 
                        <p className="text-[10px] mt-3">Publish at: {author.split("-")[1]}</p>
                    </div>              
                    <div className="py-3">
                        <p className="text-2xl font-semibold">{title}</p>
                        <p className="mt-3 leading-7">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )   
}