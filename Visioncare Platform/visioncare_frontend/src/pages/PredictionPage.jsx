import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import axios from "axios";
import { deletePredictionApi, getPredictionApi, predictionApi, savePredictionApi } from "../api/api";
import { useAuth } from "../hooks/AuthProvider";
import toast from "react-hot-toast";
import RoundButton from "../components/utilities/roundButton";

export default function PredictionPage() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)  
    const [predictionResult, setPredictionResult] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [isError, setIsError] = useState(null)
    const [predictionHistory, setPredictionHistory] = useState(null)
    const { token } = useAuth()

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]

        //Generate a preview of the image
        const reader = new FileReader()
        reader.onloadend = () => setSelectedImage(reader.result)
        reader.readAsDataURL(file)

        //Simulate the uplaod progress
        simulatedUpload()

        //Upload the image to Flask Api
        uploadImage(file)
    }   

    const simulatedUpload = () => {
        let progress = 0
        const interval = setInterval(() => {
            progress += 10
            setUploadProgress(progress)
            if(progress >= 100)
                clearInterval(interval)   
        }, 200)
    }

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        setIsLoading(true)
        
        try {
            const response = await axios.post(predictionApi, formData)
            setPredictionResult(response.data)
        } catch(error) {
            setIsError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const clearPrediction = () => {
        setSelectedImage(null)
        setUploadProgress(0)
        setPredictionResult(null)
        setIsError(null)
        setIsLoading(false)
        toast.success("Previous prediction was cleared")
    }

    const savePrediction = async () => {
        if(!predictionResult || !selectedImage) {
            toast.error("No prediction result or image to save!!")
            return 
        }

        const formData = new FormData()
        formData.append("predicted_class", predictionResult["Predicted Class"])
        formData.append("confidence", parseFloat((predictionResult["Confidence"]*100).toFixed(2)))

        //Fetch the image file
        const response = await fetch(selectedImage)
        const blob = await response.blob()
        const file = new File([blob], "prediction-image.png", { type: "image/*" })

        formData.append("image", file)

        try {
            await axios.post(savePredictionApi, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            toast.success("Prediction saved successfully")
        } catch(error) {
            console.log("Prediction Save Error: ", error)
        } finally {
            setSelectedImage(null)
            setUploadProgress(0)
            setPredictionResult(null)
            setIsError(null)
            setIsLoading(false)
        }
    }

    const getPredictionHistory = async () => {
        try {
            const response = await axios.get(getPredictionApi, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            setPredictionHistory(response.data)
        } catch(error) {
            console.log("Get Prediction Histories: ", error)
        }

    }

    const deletePrediction = async (predictionId) => {
        try {
             await axios.delete(`${deletePredictionApi}${predictionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            toast.success("Prediction deleted successfully")
            setPredictionHistory(predictionHistory.filter((item) => item.id != predictionId))
        } catch(error) {
            console.lo("Delete Prediction History: ", error)
        }
    }

    useEffect(() => getPredictionHistory)

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" })
        
    return (
        <div className="container my-5">
            <div className="flex justify-between gap-5 [&>div>p]:my-4 [&>div>p]:text-md [&>div>p]:font-semibold tablet-md:flex-col">
            <div className="w-1/2 tablet-lg:w-full">
                <p className="text-xl">Upload picture of eye x-ray to detect disease</p>
                <div {...getRootProps()} className="h-[420px] w-full mx-auto rounded-xl border-2 border-dashed border-primary flex justify-center items-center cursor-pointer">
                    <input {...getInputProps()} />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="w-28 flex flex-col items-center absolute p-2 rounded-lg bg-white">
                            <p>{uploadProgress}%</p>
                            <div className="bg-primary h-2 rounded-full"  style={{width:`${uploadProgress}%`}}/>
                        </div>
                    )} {selectedImage ? 
                    <img src={selectedImage} alt="Upload Preview" className="w-full h-full bg-center bg-cover bg-no-repeat"/> : 
                    <div className="flex flex-col items-center">
                        <span className="material-icons text-7xl">visibility</span>
                        <p className="text-sm mt-5 text-center">Drag & Drop an image here, or click to upload image</p>
                    </div>}
                </div>
                {selectedImage && 
                <div className="flex gap-5">
                    <RoundButton label="Make Prediction Again" className="mt-3 w-1/2" onClick={() => clearPrediction()}/>
                    <RoundButton icon="bookmark" label="Save Prediction" className="mt-3 w-1/2" onClick={() => savePrediction()}/>
                </div>}
            </div> 
            <div className="w-1/2 tablet-md:w-full">
                <p className="text-xl">Prediction Result</p>
                <div className="relative h-[420px]">
                    {isLoading && <div className="flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-3 bg-primary text-white">
                        <span className="loading loading-spinner"></span>
                        <p className="ml-2">Predicting...</p>
                    </div>} 
                    {isError &&  <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Prediction was errored</p>}
                    {predictionResult && predictionResult["Predicted Class"] !== "Not Eye" && <div>
                        <p>Disease: {predictionResult["Predicted Class"]}</p>
                        <div className="flex items-center my-4 py-4 border-t-2 border-b-2 border-silver dark:border-darkgray">
                            <p>Confidence: {parseFloat((predictionResult["Confidence"]*100).toFixed(2))}%</p>
                            <progress className="progress progress-success w-56 ml-5" value={predictionResult["Confidence"]*100} max="100"></progress>
                        </div>
                        <p className="mt-5">Class Probabilities:</p>
                        <div className="w-full flex justify-start items-center">
                            <div className="[&>div]:my-5 [&>div>p]:text-sm">
                                <div className="flex flex-col items-center">
                                    <p>Cataract</p>
                                    <div 
                                        className="radial-progress text-success border-4 mt-2" 
                                        style={{ "--value": parseFloat(((predictionResult["Class Probabilities"].cataract)*100).toFixed(2)) }} 
                                        role="progressbar"
                                    >
                                        {parseFloat(((predictionResult["Class Probabilities"].cataract)*100).toFixed(2))}%
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p>Diabetic Retinopathy</p>
                                    <div 
                                        className="radial-progress text-success border-4 mt-2" 
                                        style={{ "--value": parseFloat((predictionResult["Class Probabilities"].diabetic_retinopathy*100).toFixed(2)) }} 
                                        role="progressbar"
                                    >
                                        {parseFloat((predictionResult["Class Probabilities"].diabetic_retinopathy*100).toFixed(2))}%
                                    </div>
                                </div>
                            </div>
                            <div className="[&>div]:my-5 [&>div]:ml-10 [&>div>p]:text-sm">
                                <div className="flex flex-col items-center">
                                    <p>Glaucoma</p>
                                    <div 
                                        className="radial-progress text-success border-4 mt-2" 
                                        style={{ "--value": parseFloat((predictionResult["Class Probabilities"].glaucoma*100).toFixed(2)) }} 
                                        role="progressbar"
                                    >   
                                        {parseFloat((predictionResult["Class Probabilities"].glaucoma*100).toFixed(2))}%
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p>Normal</p>
                                    <div
                                        className="radial-progress text-success border-4 mt-2" 
                                        style={{ "--value": parseFloat((predictionResult["Class Probabilities"].normal*100).toFixed(2)) }} 
                                        role="progressbar"
                                    >
                                        {parseFloat((predictionResult["Class Probabilities"].normal*100).toFixed(2))}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {predictionResult && predictionResult["Predicted Class"] === "Not Eye" && <div className="relative h-full w-full">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-md p-5 text-white bg-red-500">
                            <div className="flex items-center">
                                <span className="material-icons mr-1">warning</span>
                                <p>Incorrect Image</p>
                            </div>
                            <p className="my-6">Please Upload Eye's Image</p>
                            <div 
                                className="w-fit p-2 flex items-center justify-center cursor-pointer rounded-md text-sm text-red-500 bg-white duration-200 hover:scale-105" 
                                onClick={clearPrediction}
                            >
                                <span className="material-icons mr-1">refresh</span>
                                <p>Try again</p>
                            </div>
                        </div>
                    </div>}
                    {!predictionResult && !isLoading && !isError && 
                    <div>
                        <p>Disease:</p>
                        <div className="flex items-center my-4 py-4 border-t-2 border-b-2 border-silver dark:border-darkgray">
                            <p>Confidence: 0%</p>
                            <progress className="progress progress-success w-56 ml-5" value={0} max="100"></progress>
                        </div>
                        <p className="mt-5">Class Probabilities:</p>
                        <div className="w-full flex justify-start items-center">
                            <div className="[&>div]:my-5 [&>div>p]:text-sm">
                                <div className="flex flex-col items-center">
                                    <p>Cataract</p>
                                    <div className="radial-progress text-success border-4 mt-2" style={{ "--value": 0 }} role="progressbar">0%</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p>Diabetic Retinopathy</p>
                                    <div className="radial-progress text-success border-4 mt-2" style={{ "--value": 0 }} role="progressbar">0%</div>
                                </div>
                            </div>
                            <div className="[&>div]:my-5 [&>div]:ml-10 [&>div>p]:text-sm">
                                <div className="flex flex-col items-center">
                                    <p>Glaucoma</p>
                                    <div className="radial-progress text-success border-4 mt-2" style={{ "--value": 0 }} role="progressbar">0%</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p>Normal</p>
                                    <div className="radial-progress text-success border-4 mt-2" style={{ "--value": 0 }} role="progressbar">0%</div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            </div>
            <div className="w-full mt-10">
                <p className="text-xl font-bold">Your Prediction Histories</p>
                {predictionHistory ? <div>
                    {predictionHistory.map((item, index) => (
                        <div key={index} className="relative w-full flex items-stretch mt-3 p-3 rounded-lg shadow-lg">
                            <div 
                                className="h-[150px] w-[220px] rounded-lg bg-grey tablet-md:hidden bg-center bg-cover bg-no-repeat"
                                style={{backgroundImage: `url(http://0.0.0.0:8000${item.image_url})`}}
                            />
                            <div className="w-full pl-5 flex flex-col justify-between tablet-md:h-[150px] phone-xl:justify-start">
                                <p className="text-md font-medium">Disease: {item["predicted_class"]}</p>
                                <p className="w-fit text-md py-2 px-3 rounded-xl bg-grey dark:bg-dark">
                                    Condidence: 
                                    <span className="ml-2 text-green-500">{item["confidence"]}%</span>
                                </p>
                            </div>
                            <RoundButton icon="delete" label="Delete" className="h-fit absolute bottom-2 right-2 bg-red-500 border-red-500 hover:text-red-500 hover:border-red-500" onClick={() => deletePrediction(item.id)}/>
                        </div>  
                    ))} 
                </div> 
                : <div className="w-full py-10 flex items-center justify-center">
                    <span className="material-icons mr-1">history</span>
                    <p>There's no history</p>
                </div> }
            </div>
        </div>
    )
}