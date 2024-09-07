
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { createChats, getAllUser, getCurrentChat, getUserChat } from "../entity/PrivateRouter";
import { toast } from "react-toastify";



export const ChatContext = createContext()


export const ChatContextProvider = ({children, user}) =>{

    const [userChats, setUserChat] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const [allUsersChat, setAllUsersChat] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const[messages, setMessages] = useState(null)
    

    console.log("Message:" +  messages);

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

            setMessages(response)

           

        }

        getMessages()
    }, [currentChat])

    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat)
    },[])

    
    const createChat = useCallback( async(firstId, secondId)=>{

        const response =  await createChats(firstId, secondId)


        if(response.status === "error"){
            return toast.error("Something Went worng, please try again later")
        }

        setUserChat((prev) => [...prev, response])


    },[])

    return <ChatContext.Provider
    
    value={{
        userChats,
        isLoading,
        allUsersChat,
        createChat,
        updateCurrentChat, 
        messages,
        currentChat
    }}

    >
        {children}

    </ChatContext.Provider>
}