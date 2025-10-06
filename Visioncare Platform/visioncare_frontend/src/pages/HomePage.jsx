import { DownloadVisioncareAppImg, GetOnAppStoreImg, GetOnPlaystoreImg, HomePoster, slideData } from "../constants/constant"
import Slider from "../components/home/Slider"
import NewsCard from "../components/home/NewsCard"
import { TypeAnimation } from "react-type-animation"
import RoundButton from "../components/utilities/roundButton"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import axios from "axios"
import { getNewsApi } from "../api/api"

export default function HomePage() {
  const navigate = useNavigate()
  const [news, setNews] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
      const controller = new AbortController()

      const fetchNews = async () => {
          try {
              const response = await axios.get(getNewsApi)
              setNews(response.data)
          } catch(error) {
              setIsError(`Error: ${error}`)
          } finally {
              setIsLoading(false)
          }
      }
      fetchNews()

      return () => controller.abort()
  }, [news])

  return (
    <div>
      <div>
        {/* Introduction Section */} 
        <div className="p-10 flex flex-col items-center bg-grey dark:bg-dark dark:text-darkgray">
          <div className="flex flex-col items-center mb-10">
            <TypeAnimation
                sequence={["Welcome to VisionCare AI", 3000, "We provided a powerful AI to protect your eyes", 3000]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: '35px', marginBottom: '25px' ,display: 'inline-block', color: "rgb(59 130 246)" }}
            />
            <p className="text-center text-sm mb-10">Welcome to VisionCare AI your AI Vision Care assistant that help you understand better about your sight and syndrome</p>
          </div>
          <RoundButton icon="robot_2" label="Prediction With AI" onClick={() => navigate("/prediction")}/>
        </div>
        {/* Poster Section */}
        <div className="w-full bg-primary dark:bg-transparent">
        <img src={HomePoster} alt="Home Poster" className="w-full"/>
        </div>
        {/* Slide Section */}
        <Slider slideData={slideData}/>
        {/* News Section */}
        <div className="flex flex-col items-start m-10">
          <p className="text-xl">Healthcare News</p>
          <div className="w-full overflow-x-scroll scroll-smooth no-scrollbar flex justify-start"> 
           {news && news.length > 0 && (
              news.map((item) => (
                <NewsCard key={item.id} image={item.image} title={item.title} description={item.description}/>
              ))
           )}
          </div>
        </div>
        {/* Download MobileApp Section */}
        <div className="flex items-stretch tablet-md:flex-col tablet-md:[&>div]:w-full">
            <div className="w-1/2 flex flex-col items-center justify-center p-20">
              <p className="text-md text-center font-bold mb-5 monitor:text-xl">Download Visioncare AI App</p>
              <p className="text-sm text-center my-5 leading-7 monitor:text-lg monitor:leading-10">
                The Visioncare AI App is a cutting-edge mobile application designed to help users detect eye diseases with the power of artificial intelligence. 
                This application also help users make appointment with expert doctor to discuss. It offers users an easy-to-use interface, enabling them to take 
                preventive measures by detecting eye conditions early. The app is available for download on both the App Store and Google Play, ensuring accessibility
                for a wide range of users.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <img src={GetOnAppStoreImg} alt="Get on Appstore" height={50} width={100} className="cursor-pointer"/>
                <img src={GetOnPlaystoreImg} alt="Get on Playstore" height={50} width={100} className="cursor-pointer"/>
              </div>
            </div>
            <img src={DownloadVisioncareAppImg} alt="download-visioncare-app" className="w-1/2 tablet-md:hidden"/>
        </div>
      </div>
    </div>
  )
}

