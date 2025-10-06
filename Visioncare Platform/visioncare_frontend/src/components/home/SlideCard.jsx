export default function SlideCard({image, title, description, className}) {
    return (
        <div className={`h-[300px] min-w-full flex justify-between items-center tablet-md:flex-col tablet-md:h-fit ${className} monitor:h-[500px]`}>
            {/* Image Section */}
            <img src={image} alt={title} className="h-full w-[45%] flex justify-center items-center tablet-md:h-[300px] tablet-md:w-full"/>
            {/* Content Section */}
            <div className="h-full w-[55%] flex flex-col justify-center items-center tablet-md:w-full tablet-md:p-5">
                <p className="text-xl mb-5 monitor:text-2xl">{title}</p>
                <p className="text-sm text-center pl-10 pr-16 leading-7 monitor:text-lg monitor:leading-10">{description}</p>
            </div>
        </div>
    )
}

SlideCard.defaultProps = {
    className: ''
}