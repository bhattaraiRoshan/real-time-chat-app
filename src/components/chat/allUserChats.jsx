import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"

export const AllUsersChat = () =>{


    const {user} = useContext(AuthContext)

 
    const {allUsersChat, createChat, onlineUser} = useContext(ChatContext)
   
    return (
        <>
        <div className="all-users">
            {allUsersChat && allUsersChat.map((u, index)=>{

                return(
                    <div className="single-user" key={index} onClick={() => createChat(user._id, u._id)}>
                        {u.name}
                        <span className= { onlineUser?.some((user)=> user?.userId === u?._id) ? "user-online" : ""}></span>
                    </div>
                )
            })}
        </div>
        </>
    )
}