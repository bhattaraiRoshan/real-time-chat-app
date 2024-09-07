import { useContext, useEffect, useState } from "react";
import { getCurrentChat } from "../entity/PrivateRouter"
import { ChatContext } from "../context/ChatContext";

export const useFecthcLatestMessage =  (chat) =>{

    const {newMessage, notifications} = useContext(ChatContext)
    const [latestMessasge, setLatestMessage] = useState(null)

    useEffect(()=> {

        const getMessages = async () =>{

            const response = await  getCurrentChat(chat?._id)

            if(response.status === "error"){
            return console.log("Some Went Wrong");
            }
            console.log(response.data[response.data.length -1] );
            const lastMessage =response?.data[response.data?.length -1];

            console.log(lastMessage);

            setLatestMessage(lastMessage)
        }

        getMessages()

       


    }, [newMessage, notifications])

    return {latestMessasge}
}