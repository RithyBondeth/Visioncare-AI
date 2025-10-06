import { useNavigate } from "react-router"
import { useAuth } from "../hooks/AuthProvider"
import {useDropzone} from "react-dropzone"
import useFetch from "../hooks/UseFetch"
import { changePasswordApi, editProfileApi, getProfileApi } from "../api/api"
import { useEffect, useState, useCallback } from "react"
import RoundButton from "../components/utilities/roundButton"
import axios from "axios"
import toast from "react-hot-toast"

export default function ProfilePage() {
    const { logout, token } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [isDisabled, setIsDisabled] = useState(true)
    const [previewImage, setPreviewImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    //Edit Fields
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [phonenumber, setPhonenumber] = useState("")

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        setSelectedImage(file)
        
        //Generate a preview of the image
        const reader = new FileReader()
        reader.onloadend = () => setPreviewImage(reader.result)
        reader.readAsDataURL(file)
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    const handleEditProfile = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("first_name", firstname === "" ? user.first_name : firstname)
        formData.append("last_name", lastname === "" ? user.last_name : lastname)
        formData.append("email", email === "" ? user.email : email)
        formData.append("age", age === "" ? user.age : age)
        formData.append("gender", gender === "" ? user.gender : gender)
        formData.append("phone_number", phonenumber === "" ? user.phone_number : phonenumber)
        
        if(selectedImage) {
            formData.append("profile", selectedImage)
        }

        try {
           await axios.post(editProfileApi, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })

            if(oldPass && newPass &&  confirmPass) {
                const changePassword = {
                    "old_password": oldPass,
                    "password": newPass,
                    "confirm_password": confirmPass
                }

                await axios.post(changePasswordApi, changePassword, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                })
                logout()
                navigate("/login")
            }

           toast.success("Profile Updated Successfully")
           window.location.reload()
        } catch(error) {
            console.log(error)
           toast.error("Profile Updated Unsuccessfully")
        }  
    }

    const handleLogout = () => {
        logout()
        toast.success("Logout Successfully")
        navigate("/login")
    }

    const { data } = useFetch(getProfileApi, "GET", null, token)

    useEffect(() => {
        if(data) setUser(data)
    },[data])


    return (
        <form className="container my-5 flex flex-col items-end" onSubmit={handleEditProfile}>
            <div className="w-fit mb-5 px-4 py-2 flex items-center text-center text-xl font-medium rounded-3xl text-white bg-primary">
                <span className="material-icons text-3xl mr-2">account_circle</span>
                <p>Personal Information</p>
            </div>
            <div className="w-full flex items-stretch gap-5 tablet-xl:flex-col">
                <div className="w-[40%] flex flex-col justify-start items-center tablet-xl:w-full">
                    <div className="relative">
                        <img 
                            src={previewImage ? previewImage : `http://0.0.0.0:8000${user.profile}`} 
                            alt={user.first_name}  
                            className={`${user.profile ? "max-w-[300px] max-h-[300px]" : "min-w-[300px] min-h-[300px]"}  mt-2 rounded-full bg-center bg-cover bg-no-repeat bg-sliver`}
                        />
                        {!isDisabled &&   <div {...getRootProps()} className="absolute -bottom-4 right-1/2 translate-x-1/2 p-3 rounded-full cursor-pointer bg-primary text-white duration-200 hover:scale-105 material-icons">
                            <input {...getInputProps()}/>
                            add_a_photo
                        </div>}
                    </div>
                    <p className="text-lg font-bold mt-9">Hi, I'm {user.first_name} {user.last_name}👋🏻</p>
                    <RoundButton icon="logout" label="Logout" className="mt-5 bg-red-500 border-red-500 hover:text-red-500 hover:border-red-500" onClick={(e) => {
                        e.preventDefault()
                        handleLogout()
                    }}/>
                </div>
                <div className="w-[60%] tablet-xl:w-full">
                    <div>
                        <label htmlFor="email" className="text-sm">Email</label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                            <span className="material-icons">email</span>
                            <input type="email" name="email" className="grow" placeholder="Email" value={isDisabled ? user.email : email} onChange={(e) => setEmail(e.target.value)} disabled={isDisabled}/>
                        </label>
                    </div>
                    <div className="flex items-center gap-5 mt-5 tablet-md:flex-col tablet-md:[&>div]:w-full">
                        <div className="w-1/2">
                            <label htmlFor="firstname" className="text-sm">Firstname</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <span className="material-icons">person</span>
                                <input type="text" className="grow" name="first_name" placeholder="First Name" value={isDisabled ? user.first_name : firstname} onChange={(e) => setFirstname(e.target.value)} disabled={isDisabled}/>
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastname" className="text-sm">Lastname</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <span className="material-icons">person</span>
                                <input type="text" className="grow" name="last_name" placeholder="Last Name" value={isDisabled ? user.last_name : lastname} onChange={(e) => setLastname(e.target.value)} disabled={isDisabled}/>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 tablet-md:flex-col tablet-md:[&>div]:w-full">
                        <div className="w-[25%]">
                            <label htmlFor="age" className="text-sm">Age</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <input type="number" className="grow" name="age" placeholder="Age" value={isDisabled ? user.age : age} onChange={(e) => setAge(e.target.value)} disabled={isDisabled}/>
                            </label>
                        </div>
                        <div className="w-[25%] tablet-md:my-2">
                            <label htmlFor="gender" className="text-sm">Gender</label>
                            <select className="select select-bordered w-full mt-2" name="gender" value={isDisabled ? user.gender : gender} onChange={(e) => setGender(e.target.value)} disabled={isDisabled}>
                                <option value="" disabled>No Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                            </select>
                        </div>
                        <div className="w-[40%]">
                            <label htmlFor="phone_number" className="text-sm">Phone Number</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <span className="material-icons">phone</span>
                                <input type="text" className="grow" name="phone_number" placeholder="Phone Number" value={isDisabled ? user.phone_number : phonenumber} onChange={(e) => setPhonenumber(e.target.value)} disabled={isDisabled}/>
                            </label>
                        </div>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="old_password" className="text-sm">Old Password</label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                            <span className="material-icons">lock</span>
                            <input type="text" name="old_password" className="grow" placeholder="Old Password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} disabled={isDisabled}/>
                            <span className="material-icons">visibility</span>
                        </label>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="new_password" className="text-sm">New Password</label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                            <span className="material-icons">lock</span>
                            <input type="text" name="new_password" className="grow" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} disabled={isDisabled}/>
                            <span className="material-icons">visibility</span>
                        </label>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="confirm_password" className="text-sm">Confirm Password</label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
                            <span className="material-icons">lock</span>
                            <input type="text" name="confirm_password" className="grow" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} disabled={isDisabled}/>
                            <span className="material-icons">visibility</span>
                        </label>
                    </div>
                    <div className="mt-5 w-full flex justify-end gap-5">
                        <RoundButton 
                            icon={isDisabled ? "edit_note" : "undo"} 
                            label={isDisabled ? "Edit Profile" : "Undo"} 
                            className={!isDisabled && "bg-red-500 border-red-500 hover:text-red-500 hover:border-red-500"}
                            onClick={(e) => {
                                e.preventDefault()
                                setIsDisabled(!isDisabled)
                            }}
                        />
                        <button type="submit">
                            <RoundButton icon="save" label="Save Profile"/>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )   
}