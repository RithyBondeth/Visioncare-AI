import { useEffect, useState } from "react";
import { getNewsApi } from "../../api/api";
import NewsBigCard from "../../components/news/NewsBigCard";
import NewsSmallCard from "../../components/news/NewsSmallCard";
import useFetch from "../../hooks/UseFetch";
import axios from "axios";

export default function NewsPage() {
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
    
    if(isLoading) {
        return (
            <div className="fixed top-16 bottom-0 left-0 right-0 flex justify-center items-center bg-white">
                <div className="flex justify-center items-center">
                    <span className="loading loading-spinner mr-2 text-lg text-primary"></span>
                    <p className="text-lg">News Loading...</p>
                </div>
            </div>
        )
    }

    if(isError) {
        return (
            <div className="fixed top-[25px] bottom-0 left-0 right-0 flex justify-center items-center bg-white">
                <div className="flex justify-center items-center">
                    <span className="material-icons">cancel</span>
                    <p className="text-lg">Error to fetch news</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            {news && news.length > 0 && <div>
                <NewsBigCard 
                    key={news[news.length - 1]} 
                    image={news[news.length - 1].image} 
                    title={news[news.length - 1].title}
                    description={news[news.length - 1].description} 
                    author={news[news.length - 1].author}
                />
                <div className="container">
                    <p className="text-lg font-semibold">Healthcare News</p>
                    <div className="flex flex-col mt-2">
                        {news.map((item, index) => (
                            <NewsSmallCard 
                                key={index} 
                                image={item.image} 
                                title={item.title} 
                                description={item.description} 
                                author={item.author}
                            />
                        ))}
                    </div>
                </div>
            </div>}
        </div>
    )
}