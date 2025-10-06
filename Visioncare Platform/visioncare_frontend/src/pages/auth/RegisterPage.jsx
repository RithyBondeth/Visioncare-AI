import { VisioncareLogo } from "../../constants/constant"
import { useState, useCallback } from "react"
import axios from "axios"
import { editProfileApi, registerApi } from "../../api/api"
import toast from "react-hot-toast"
import { useDropzone } from "react-dropzone"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"

export default function RegisterPage() {  
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        gender: "",
        phone_number: "",
        password: "",

    })
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        setSelectedImage(file)

        //Generate a preview of the image
        const reader = new FileReader()
        reader.onloadend = () => setPreviewImage(reader.result)
        reader.readAsDataURL(file)
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const handleRegister = async (e) => {
        e.preventDefault()

        const form = new FormData()

        form.append("first_name", formData.first_name)
        form.append("last_name", formData.last_name)
        form.append("email", formData.email)
        form.append("age", formData.age)
        form.append("gender", formData.gender)
        form.append("password", formData.password)    

        try {
            const registerResponse = await axios.post(registerApi, form)
            const token = registerResponse.data.token

            await axios.post(editProfileApi, 
            {
                "phone_number": formData.phone_number,
                "profile": selectedImage
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                age: "",
                gender: "",
                phone_number: "",
                password: "",
            })
            toast.success("Register Successfully!")
            navigate("/login")
        } catch(error) {
            toast.error("Register Unsuccessfully!")   
        }
    }

    const { getRootProps, getInputProps } = useDropzone({onDrop})
    
    return (
        <form className="h-screen w-full flex" onSubmit={handleRegister}>
            <div className="relative h-full w-[40%] flex justify-center items-center"> 
                <div className="flex flex-col items-center">
                    <img src={VisioncareLogo} alt="VisioncareAI Logo" className="w-1/2"/>
                    <p className="text-5xl mt-5 font-bold text-primary">VisionCare AI</p>
                    <p className="text-md mt-5 text-primary">Your eyes deserve the best</p>
                </div>
                <NavLink to="/login" className="absolute left-3 top-3 material-icons p-2 rounded-full bg-primary text-white duration-200 hover:scale-105">arrow_back</NavLink>
            </div>
            <div className="h-full w-[60%] flex justify-center items-center bg-primary dark:bg-white">
                <div className="w-[80%] px-10 py-7 flex flex-col items-center rounded-lg bg-white dark:bg-dark">
                    <p className="text-xl font-medium ">Register to VisionCare AI</p>
                    <div className="flex justify-between items-end gap-5 w-full mt-5">
                        <div className="w-full">
                            <div className="w-full">
                                <label htmlFor="firstname" className="text-sm">Firstname</label>
                                <label className="input input-bordered flex items-center gap-2 mt-1">
                                    <span className="material-icons">person</span>
                                    <input type="text" name="first_name" className="grow" placeholder="Firstname" value={formData.first_name} onChange={handleChange} required/>
                                </label>
                            </div>
                            <div className="w-full mt-3">
                                <label htmlFor="lastname" className="text-sm">Lastname</label>
                                <label className="input input-bordered flex items-center gap-2 mt-1">
                                    <span className="material-icons">person</span>
                                    <input type="text" name="last_name" className="grow" placeholder="Lastname" value={formData.last_name} onChange={handleChange} required/>
                                </label>
                            </div>
                        </div>
                        <div {...getRootProps()} className={`${selectedImage ? "max-w-[160px] max-h-[160px]" : "min-w-[160px] min-h-[160px]"} flex justify-center items-center rounded-full bg-primary`}>
                            <input {...getInputProps()}/>
                            {selectedImage ? <img src={previewImage} alt="Profile Image" className="w-full h-full rounded-full"/> :
                            <p className="text-sm px-5 text-center text-white">Upload Profile Image</p>}
                        </div>
                    </div>
                    {/* Age and Gender and Phone Number Section */}
                    <div className="w-full flex justify-between items-center mt-3">
                        <div className="w-[25%]">
                            <label htmlFor="age" className="text-sm">Age</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <input type="number" name="age" className="grow" placeholder="Age" value={formData.age} onChange={handleChange} required/>
                            </label>
                        </div>
                        <div className="w-[25%]">
                            <label htmlFor="gender" className="text-sm">Gender</label>
                            <select className="select select-bordered w-full max-w-xs" name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="" disabled>No Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>
                        </div>
                        <div className="w-[45%]">
                            <label htmlFor="phone-number" className="text-sm">Phone Number</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <span className="material-icons">phone</span>
                                <input type="text" name="phone_number" className="grow" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required/>
                            </label>
                        </div>
                    </div>
                    {/* Email Section */}
                    <div className="w-full mt-3">
                        <label htmlFor="email" className="text-sm">Email</label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                            <span className="material-icons">email</span>
                            <input type="email" name="email" className="grow" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                        </label>
                    </div>
                    <div className="w-full mt-3">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                            <span className="material-icons">lock</span>
                            <input type={showPassword ? "text" : "password"} name="password" className="grow" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                            <span className="material-icons" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "visibility_off" : "visibility"}</span>
                        </label>
                    </div>
                    <button type="submit" className="w-full mt-6 p-2 rounded-lg border-2 border-primary text-white bg-primary duration-200 hover:scale-105 hover:bg-white hover:text-primary dark:hover:bg-dark">Register</button>
                </div>
            </div>
        </form>
    )
}