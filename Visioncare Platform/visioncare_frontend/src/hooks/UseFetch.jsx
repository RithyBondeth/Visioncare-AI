import axios from "axios"
import { useState, useEffect } from "react"

const useFetch = (url, method="GET", body=null, token=null) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        
        const fetchdata = async () => {
            try {
                const config = { 
                    method, 
                    url,
                    data: body,
                    headers: {
                        "Authorization": token && `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
                const response = await axios(config)
                setData(response.data.data)
            } catch(error) {
                if(axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);   
                } else if(error.response) {
                    setError(`Error: ${error.response.status} ${error.response.statusText}`);
                } else if(error.request) {
                    setError('Error: No response received');
                } else {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchdata()

        return () => controller.abort()
    },[url, method, body, token])    

    return { data, loading, error }
} 

export default useFetch