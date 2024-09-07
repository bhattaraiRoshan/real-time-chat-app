
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
    const [notifications, setNotifications] = useState([])
    const [allUsers, setAllUsers] = useState([])

    console.log(onlineUser);
   // get scoket

   useEffect(()=>{
    const newSocket = io("https://socketioforchatapplication.onrender.com")
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


   // receive message & notification

   useEffect(()=>{
    if(socket === null) return;

    socket.on("getMessage", res =>{

        if(currentChat?._id !== res.chatId) return

        setMessages((prev) => [...prev, res])
    })

    socket.on("getNotification", (res) =>{
        const isChatOpen = currentChat?.members.some(id => id === res.senderId)

        if(isChatOpen){
            setNotifications(prev => [{...res, isRead:true}, ...prev])
        } else{
            setNotifications(prev => [res, ...prev])
        }
    })

    return () => {
        socket.off("getMessage")
        socket.off("getNotifications")
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

            setAllUsers(response)

        }
        getUsers()
    },[userChats, notifications])


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

    const markAllNotificationsAsRead = useCallback((notifications)=>{

        const modifyNotifications = notifications.map(n=> { return {...n, isRead: true}})

        setNotifications(modifyNotifications)

    }, [])


    const markNotificationAsRead = useCallback((n, userCharts, user, notifications) => {

        const toOpenChat = userCharts.find(chat =>{
            const chatMembers = [user._id, n.senderId]
            const isDesiredChat = chat?.members.every((member) => {
                return chatMembers.includes(member)
            })

            return isDesiredChat;
        })

        const mNotifications = notifications.map((el)=>{
            if(n.senderId === el.senderId){
                return {...n, isRead: true}
            } else{
                return el
            }
        })

        updateCurrentChat(toOpenChat)
        setNotifications(mNotifications)
    }, [])


    const markUserNotificationsAsRead = useCallback((thisUserNotification, notifications)=>{


        const mNotifications = notifications.map(el =>{

            let notification;

            thisUserNotification.forEach(n =>{

                if(n.senderId == el.senderId){
                    notification = {...n, isRead: true}
                } else{
                    notification = el
                }
            })

            return notification
        })


      

        setNotifications(mNotifications)

    })

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
        onlineUser,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        markUserNotificationsAsRead
    }}

    >
        {children}

    </ChatContext.Provider>
}