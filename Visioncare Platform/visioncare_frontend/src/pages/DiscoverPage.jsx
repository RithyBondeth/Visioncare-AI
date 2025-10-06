import DiseaseCard from '../components/discover/DiseaseCard.jsx'
import useFetch from '../hooks/UseFetch'
import { diseaseApi } from '../api/api.js'
import { DiscoverPoster } from '../constants/constant'
import CataractImg from "../assets/diseases/cataract.jpg"
import DiabeticImg from "../assets/diseases/diabetic.jpeg"
import GluacomaImg from "../assets/diseases/glaucoma.jpg"
import NormalImg from "../assets/diseases/normal.jpg"
import { useNavigate } from 'react-router'

export default function DiscoverPage() {
    const { data, loading, error } = useFetch(diseaseApi, "GET")
    const navigate = useNavigate()

    const getImageForDisease = (title) => {
        switch (title) {
            case "Cataract":
                return CataractImg;
            case "Glaucoma":
                return GluacomaImg;
            case "Normal":
                return NormalImg;
            case "Diabetic_retinopathy":
                return DiabeticImg;
        }
    }

    const getLinkForDisease = (title) => {
        switch (title) {
            case "Cataract":
                return "https://en.wikipedia.org/wiki/Cataract"
            case "Glaucoma":
                return "https://en.wikipedia.org/wiki/Glaucoma"
            case "Normal":
                return "https://en.wikipedia.org/wiki/Eye";
            case "Diabetic_retinopathy":
                return "https://en.wikipedia.org/wiki/Diabetic_retinopathy"
        }
    }

    const handleCardClick = (title) => {
        const externalLink = getLinkForDisease(title)
        window.open(externalLink, '_blank')
    }

    return (
        <div>
            {/* Poster Section */}
            <img src={DiscoverPoster} alt="discover poster" className="w-full"/>
            {/* Decease List Section */}
            <div className="container my-5">
                <p className="text-lg mb-3 font-medium">Eyes Diseases</p>
                <div className="grid grid-cols-2 gap-5 tablet-lg:grid-cols-1">
                   {loading && <p>Loading...</p>}
                   {error && <p>{error}</p>}
                   {data && data.length > 0 ? (
                        data.map((item) => (
                            <DiseaseCard 
                                key={item.id} 
                                description={item.description} 
                                image={getImageForDisease(item.title)}
                                title={item.title === "Diabetic_retinopathy" ? "Diabetic Retinopathy" : item.title} 
                                onClick={() => handleCardClick(item.title)}
                            />
                        ))
                   ) : (!loading && !error && <p>No data available</p>) }
                </div>
            </div>
            
        </div>
    )
}