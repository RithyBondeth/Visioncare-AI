import VisionCareAILogo from '../assets/visioncareai-logo.png'
import Cam from '../assets/cambodia-flag.png'
import Eng from '../assets/english-flag.png'
import FacebookIcon from '../assets/socials/facebook.png'
import TelegramIcon from '../assets/socials/telegram.png'
import LinkedInIcon from '../assets/socials/linkedin.png'
import EmailIcon from '../assets/socials/email.png'
import PhoneIcon from '../assets/socials/phone.png'
import GetMobileAppIcon from '../assets/getmobileapp.png'
import AppStoreImage from '../assets/getonappstore.png'
import PlaystoreImage from '../assets/getongoogle.webp'
import DownloadVisioncareAppImage from '../assets/downloadvisioncareapp.png'

//SlideData Images
import LaboratoryImg from '../assets/slides/laboratory.webp'
import DiagnosisImg from '../assets/slides/diagnosis.webp'
import EyesDeceaseImg from '../assets/slides/eyesdecease.webp'
import EyesConsultantImg from '../assets/slides/eyesconsultant.webp'

//Poster Images
import AboutusPs from '../assets/posters/aboutus-poster.svg'
import DiscoverPs from '../assets/posters/discover-poster.svg'
import ScanPs from '../assets/posters/scan-poster.svg'
import HomePs from '../assets/posters/home-poster.svg'

//OurTeams 
import SoklengImg  from '../assets/ourteam/sokleng.jpg'
import SambathImg from '../assets/ourteam/hul-sambath.jpg'
import RathanaImg from '../assets/ourteam/hang-rithratana.jpg'
import BondethImg from '../assets/ourteam/bondeth.jpg'
import KimchhivImg from '../assets/ourteam/kim-chhiv.jpg'
import SamboImg from '../assets/ourteam/sambo.jpg'

export const AboutusPoster = AboutusPs
export const DiscoverPoster = DiscoverPs
export const ScanPoster = ScanPs
export const HomePoster = HomePs

export const GetOnAppStoreImg = AppStoreImage
export const GetOnPlaystoreImg = PlaystoreImage
export const DownloadVisioncareAppImg = DownloadVisioncareAppImage

//Navabr
export const titles = ["VisionCare AI", "We protect your eyes"]
export const VisioncareLogo = VisionCareAILogo

export const EnglishFlag = Eng
export const CambodiaFlag = Cam

export const motionButton = {
    whileHover: {
        scale: 1.2, 
        transition: { duration: 1 }
    },
    whileTap: {
        scale: 0.9 
    }
}

export const navbarData = [
    {
        label: "Home",
        link: "/",
    },
    {
        label: "About Us",
        link: "/about"
    },
    {
        label: "News",
        link: "/news"
    },
    {
        label: "Discover",
        link: "/discover"
    },
    {
        label: "Contact",
        link: "/contact"
    },
]

export const footerData = {
    explore: ["Home", "About Us", "Scan Diseases", "Contact Us"],
    discover: ["Diseases", "Doctor", "Eyes Test"], 
    social: [
        { 
            label: "Facebook",
            icon: FacebookIcon,
            link: "/facebook",
        },
        { 
            label: "Telegram",
            icon: TelegramIcon,
            link: "/Telegram",
        },
        { 
            label: "Linkedin",
            icon: LinkedInIcon,
            link: "/Linkedin",
        },
    ],
    address: [
        {
            icon: "location_on",
            label: "St210, Beoung Keng Korng, Phnom Penh"
        },
        {
            icon: "phone",
            label: "+855 85752214"
        },
        {
            icon: "email",
            label: "info@visioncareai.com"
        }
    ],
    getmobileappImg: GetMobileAppIcon,
    copyright: "@2024-2025 Visioncare AI. All Right Reserved"
}

export const slideData = [
    {
        image: LaboratoryImg,
        content: {
            title: "Laboratory",
            description: `The laboratory plays a crucial role in ensuring the accuracy and reliability of the app's disease detection 
                          capabilities. By simulating various eye conditions and analyzing thousands of data points, we continuously 
                          refine the AI models, making Visioncare AI a trusted tool for early detection and preventive care.`,
        }   
    },
    {
        image: DiagnosisImg,
        content: {
            title: "Diagnosis",
            description: `The Diagnosis feature in Visioncare AI provides users with an instant and accurate analysis of their eye health. 
                          By leveraging advanced AI algorithms, the app can identify potential eye diseases, such as cataracts and glaucoma, 
                          based on images uploaded by the user. This quick diagnosis helps users take timely action, ensuring better eye care 
                          and preventing severe complications.`
        }   
    },
    {
        image: EyesDeceaseImg,
        content: {
            title: "Eyes Diseases",
            description: `Visioncare AI leverages advanced image processing technology to detect various eye diseases. By analyzing high-resolution 
                          images of your eyes, our app can identify early signs of conditions such as cataracts, glaucoma, and macular degeneration. 
                          With quick and accurate assessments, you can take proactive steps toward preserving your vision and seeking timely medical 
                          advice.`,
        }   
    },
    {
        image: EyesConsultantImg,
        content: {
            title: "Eyes Consultant",
            description: `With Visioncare AI's Eyes Consultant feature, you can receive personalized advice tailored to your unique eye health needs. 
                         Our AI-driven consultant analyzes your lifestyle, dietary habits, and eye health data to offer recommendations on how to maintain 
                         optimal vision. Whether you're concerned about screen time, eye strain, or overall wellness, our Eyes Consultant is here to guide 
                         you towards better eye health.`,
        }   
    }
]

export const ourTeamData = [
    {
        name: "SokLeng",
        image: SoklengImg,
        position: "Founder of Visioncare AI"   
    },
    {
        name: "Sambo",
        image: SamboImg,
        position: "Founder of Visioncare AI"   
    },
    {
        name: "Kim Chhiv",
        image: KimchhivImg,
        position: "Founder of Visioncare AI"
    },
    {
        name: "Sambath",
        image: SambathImg,
        position: "Founder of Visioncare AI"
    },
    {
        name: "Ratana",
        image: RathanaImg,
        position: "Founder of Visioncare AI"
    },
    {
        name: "Bondeth",
        image: BondethImg,
        position: "Founder of Visioncare AI"
    },
]

export const contactPageData = [
    {
        id: 1,
        image: FacebookIcon,
        label: "Official Facebook",
        labelName: "Visioncare AI Official"
    },
    {
        id: 2,
        image: TelegramIcon,
        label: "Official Telegram",
        labelName: "Visioncare AI Official"
    },
    {
        id: 3,
        image: EmailIcon,
        label: "Official Email",
        labelName: "info@visioncareai.com"
    },
    {
        id: 4,
        image: PhoneIcon,
        label: "Official Phone Number",
        labelName: "088 880 880"
    }    
]