import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [credit, setCredit] = useState(false)
    const [sourceImage, setSourceImage] = useState(null)
    const [targetImage, setTargetImage] = useState(null)
    const [prompt, setPrompt] = useState("")
    const [sourceImageName, setSourceImageName] = useState("")
    const [targetImageName, setTargetImageName] = useState("")

    const navigate = useNavigate()


    const handleSourceImage = (file) => {
        if (file && file.type.startsWith('image/')) {
            setSourceImage(file)
            setSourceImageName(file.name)
            console.log('Source Image:', file)
            toast.success(`Selected source image: ${file.name}`)
        } else {
            toast.error('Please select a valid image file')
        }
    }
    
    const handleTargetImage = (file) => {
        if (file && file.type.startsWith('image/')) {
            setTargetImage(file)
            setTargetImageName(file.name)
            console.log('Target Image:', file)
            toast.success(`Selected target image: ${file.name}`)
        } else {
            toast.error('Please select a valid image file')
        }    
    }

    const handlePrompt = (text) => {
        setPrompt(text)
        console.log('Prompt:', text)
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { getToken } = useAuth()
    const { isSignedIn } = useUser()
    const { openSignIn } = useClerk()

    const loadCreditsData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios(`${backendUrl}/api/user/credits`, {headers:{token}})
            if (data.success) {
                setCredit(data.credits)
                console.log(data.credits)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const becomeImage = async() => {
        try {
            if(!isSignedIn) {
                toast.error('Please sign in to continue')
                return openSignIn()
            }

            if(!sourceImage || !targetImage || !prompt) {
                toast.error('Please provide all required inputs')
                return
            }

            navigate('/')

            const formData = new FormData()

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        credit, setCredit,
        loadCreditsData,
        backendUrl,
        sourceImage, setSourceImage,
        targetImage, setTargetImage,
        prompt, setPrompt,
        handleSourceImage,
        handleTargetImage,
        handlePrompt,   
        sourceImageName,
        targetImageName,
        becomeImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AppContextProvider;



