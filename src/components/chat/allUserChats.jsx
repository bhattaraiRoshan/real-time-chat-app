import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"

export const AllUsersChat = () =>{


    const {user} = useContext(AuthContext)

 
    const {allUsersChat, createChat} = useContext(ChatContext)
   
    return (
        <>
        <div className="all-users">
            {allUsersChat && allUsersChat.map((u, index)=>{

                return(
                    <div className="single-user" key={index} onClick={() => createChat(user._id, u._id)}>
                        {u.name}
                        <span className="user-online"></span>
                    </div>
                )
            })}
        </div>
        </>
    )
}