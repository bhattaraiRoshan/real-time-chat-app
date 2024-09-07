import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { useFetchRecipient } from "../hooks/useFetchRecipient"
import { Stack } from "react-bootstrap"
import moment from "moment"
import InputEmoji from "react-input-emoji"


export const ChatBox = () =>{

    const [textMessage, setTextMessage] = useState("")
    const {user} = useContext(AuthContext)
    const {currentChat, isLoading,messages, sendTextMessage} = useContext(ChatContext)

    const {recipientUser} = useFetchRecipient(currentChat, user)
    const scroll = useRef()

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior: "smooth"})
    })

    
    if(!recipientUser){
        return <p style={{textAlign: "center" , width: "100%"}}>No Conversation Selected yet......................</p>
    }

    if(isLoading){
        return(
            <p style={{textAlign: "center", width: "100%"}}>Loading Chat.....</p>
        )
    }

    return(
       <Stack gap={4} className="chat-box">
        <div className="chat-header">
            <strong>{recipientUser?.name}</strong>

        </div>
       <Stack gap={3} className="messages">
        {messages && messages?.map((message,index)=>{
      
            return(
                <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" :  "message align-self-start flex-grow-0"}`}
                ref={scroll}
                >
                    <span>{message?.text}</span>
                    <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                </Stack>
            )
        })} 

       </Stack>

       <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji value={textMessage} onChange={setTextMessage} />
      
      <button className="send-btn" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check" viewBox="0 0 16 16">
    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"/>
    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
    </svg>
      </button>
       </Stack>
       </Stack>
    )
}