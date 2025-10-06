export default function NewsSmallCard({ image, title, description, author }) {
    return (
        <div className="w-full flex items-stretch rounded-lg my-2 border-2 border-grey dark:border-darkgray"> 
           <div className="w-1/3 m-3 rounded-lg bg-center bg-cover bg-no-repeat tablet-xl:hidden" style={{backgroundImage: `url(http://127.0.0.1:8000${image})`}}/>
           <div className="w-2/3 m-3 flex flex-col justify-between tablet-xl:w-full">
                <div>
                    <div className="text-sliver text-xs">
                        <p className="p-2 w-fit rounded-lg border-[1px] border-sliver">{author.split("-")[0]}</p> 
                        <p className="text-[10px] mt-3">Published at: {author.split("-")[1]}</p>
                    </div>              
                    <div className="py-2">
                        <p className="text-xl font-semibold">{title}</p>
                        <p className="mt-4 text-md leading-7">{description}</p>
                    </div>
                </div>
           </div>
        </div>
    )   
}