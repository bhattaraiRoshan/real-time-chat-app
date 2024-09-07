import { useEffect, useState } from "react"
import { findUserChat, getOneUser } from "../entity/PrivateRouter"
import { toast } from "react-toastify"



export const useFetchRecipient = (chat, user) =>{

    const [recipientUser, setRecipientUser] = useState(null)

    const recipientId = chat?.members?.find((id) => id !== user?._id)

    

    useEffect(()=>{

        const getUser = async() =>{

            if(!recipientId) return;

            const response = await getOneUser(recipientId)

            if(response.status === "error"){
                toast.error("Something went wrong")
            }

            setRecipientUser(response.data)

            
        }

        getUser()
    }, [recipientId])


    return {
        recipientUser
    }
}