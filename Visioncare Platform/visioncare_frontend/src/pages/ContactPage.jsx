import { useState } from "react";
import ContactCard from "../components/contact/ContactCard";
import { contactPageData } from "../constants/constant";
import RoundButton from "../components/utilities/roundButton";
import axios from "axios";
import { createMessageApi } from "../api/api";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const clearForm = () => {
        setName("")
        setPhoneNumber("")
        setEmail("")
        setSubject("")
        setMessage("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("name", name)
        formData.append("email", email)
        formData.append("phone_number", phoneNumber)
        formData.append("subject", subject)
        formData.append("message", message)

        try {
            await axios.post(createMessageApi, formData)
            toast.success("Your message will reach our team")
            clearForm()
        } catch(error) {
            clearForm()
            toast.error("Failed to send message!")
        }
    }

    return (
        <div className="my-10">
            <div className="flex flex-wrap justify-center items-center gap-5">
            {contactPageData.map((item) => (
                <ContactCard image={item.image} label={item.label} labelName={item.labelName} key={item.label}/>
            ))}
            </div>       
            <div className="">
                <form className="container mt-10" onSubmit={handleSubmit}>
                    <p className="uppercase font-medium text-xl">Send Feedback To Our Team</p>
                    <div className="w-full flex justify-between items-center [&>div]:w-[49%] mt-5 phone-lg:flex-col phone-lg:[&>div]:w-full">
                        <div>
                            <label htmlFor="name" className="text-sm">Name</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <span className="material-icons">person</span>
                                <input type="text" name="name" className="grow" placeholder="Enter Name..." value={name} onChange={(e) => setName(e.target.value)} required/>
                            </label>
                        </div>
                        <div className="phone-lg:mt-5">
                            <label htmlFor="phone_number" className="text-sm">Phone Number</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <span className="material-icons">phone</span>
                                <input type="text" name="phone_number" className="grow" placeholder="Enter Phone Number..." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-center [&>div]:w-[49%] mt-5 phone-lg:flex-col phone-lg:[&>div]:w-full">
                        <div>
                            <label htmlFor="email" className="text-sm">Email</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <span className="material-icons">email</span>
                                <input type="email" name="email" className="grow" placeholder="Enter Email..." value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </label>
                        </div>
                        <div className="phone-lg:mt-5">
                            <label htmlFor="subject" className="text-sm">Subject</label>
                            <label className="input input-bordered flex items-center gap-2 mt-1">
                                <span className="material-icons">subject</span>
                                <input type="text" name="subject" className="grow" placeholder="Enter Subject..." value={subject} onChange={(e) => setSubject(e.target.value)} required/>
                            </label>
                        </div>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="message" className="text-sm">Message</label>
                        <textarea placeholder="Enter Message..." name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="textarea textarea-bordered w-full mt-1" required></textarea>
                    </div>
                    <div className="mt-5 w-full flex justify-end">
                        <RoundButton label="Send Message" type="submit"/>
                    </div>
                </form>    
            </div>         
        </div>
    )
}