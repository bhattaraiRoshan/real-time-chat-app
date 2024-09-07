
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { createChats, createMessage, getAllUser, getCurrentChat, getUserChat } from "../entity/PrivateRouter";
import { toast } from "react-toastify";
import { io } from "socket.io-client";


export const ChatContext = createContext()


export const ChatContextProvider = ({children, user}) =>{

    const [userChats, setUserChat] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const [allUsersChat, setAllUsersChat] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const[messages, setMessages] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const[onlineUser, setOnlineUsers] = useState([])
    

    console.log(onlineUser);
   // get scoket

   useEffect(()=>{
    const newSocket = io("http://localhost:3000")
    setSocket(newSocket)

    return() =>{
        newSocket.disconnect()
    }
   }, [user])

   useEffect(()=>{
    if(socket === null) return;
    socket.emit("addNewUser", user?._id)

    socket.on("getOnlineUsers", (res) =>{

        setOnlineUsers(res)

    })


    return()=>{
        socket.off("getOnlineUsers")
    }
   },[socket])

   // send message 

   useEffect(()=>{
    if(socket === null) return;

    const recipientId = currentChat?.members?.find((id) => id !== user?._id)
    
    socket.emit("sendMessage", {...newMessage, recipientId})
   },[newMessage])


   // receive message

   useEffect(()=>{
    if(socket === null) return;

    socket.on("getMessage", res =>{

        if(currentChat?._id !== res.chatId) return

        setMessages((prev) => [...prev, res])
    })

    return () => {
        socket.off("getMessage")
    }
   },[socket, currentChat])







    useEffect(()=>{
        const getUsers = async () =>{

            const response = await getAllUser()

            if(response.status === "error"){
                console.log("Something went wrong");
            }

            const PChats = response.filter((u) =>{
                let isChatCreated = false;

                if(user?._id === u?._id) return false;

                if(userChats){
                    isChatCreated = userChats?.some((chat)=>{
                        return chat.members[0] === u._id || chat.members[1] == u._id
                    })
                }

                return !isChatCreated
            })

            setAllUsersChat(PChats)

            

        }
        getUsers()
    },[userChats])


    useEffect(()=>{

        const getUserChats = async () =>{

            if(user?._id){
                console.log(user._id);
                setIsLoading(true)
                const response = await getUserChat(user?._id)

                setIsLoading(false)
                if(response.status === "error"){
                    return toast.error(response.message)
                }


                setUserChat(response.data)
            }
        }

        getUserChats()

    },[user])


    useEffect(()=>{

        const getMessages = async () =>{

            setIsLoading(true);
        
            const response = await getCurrentChat(currentChat?._id)


            if(response.status === "error"){
                return toast.error("Something went wrong")
            }

            setIsLoading(false)

            setMessages(response.data)


           

        }

        getMessages()
    }, [currentChat])

    const sendTextMessage = useCallback( async (textMessage, sender, currentChatId, setTextMessage)=>{

        console.log(textMessage);
        if(!textMessage) return toast.error("Please try something...")

            const response = await createMessage(currentChatId, sender?._id, textMessage)
            console.log(response);

            if(response.status === "error"){
                toast.error("Please try again later")
            }

            setNewMessage(response.data)
            setMessages((prev)=> [...prev, response.data])
            setTextMessage("")

    },[])

    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat)
    },[])

    
    const createChat = useCallback( async(firstId, secondId)=>{

        const response =  await createChats(firstId, secondId)


        if(response.status === "error"){
            return toast.error("Something Went worng, please try again later")
        }

        setUserChat((prev) => [...prev, response.data])


    },[])

    return <ChatContext.Provider
    
    value={{
        userChats,
        isLoading,
        allUsersChat,
        createChat,
        updateCurrentChat, 
        messages,
        currentChat,
        sendTextMessage,
        onlineUser
    }}

    >
        {children}

    </ChatContext.Provider>
}