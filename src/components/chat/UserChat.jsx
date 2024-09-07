import { Stack } from "react-bootstrap"
import { useFetchRecipient } from "../../hooks/useFetchRecipient"
import avater from "../../assets/avater.svg"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"

export const UserChat = ({chat, user}) =>{


    const {recipientUser} = useFetchRecipient(chat, user)

    const {onlineUser} = useContext(ChatContext)

    const isUserOnline = onlineUser?.some((user)=> user?.userId === recipientUser?._id)

   
    return(
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between " role="button">

            <div className="d-flex">
                <div className="me-2">
                    
                    <img src={avater} alt="profile picture" height="35px" />

                </div>

                <div className="text-content">
                    <div className="name">
                        {recipientUser?.name}

                    </div>
                    <div className="text">
                        Text Message

                    </div>

                </div>

            </div>

            <div className="d-flex flex-column align-items-end">

                <div className="date">12/12/2012</div>
                <div className="this-user-notifications">2</div>
                <span className= {isUserOnline ? "user-online" : ""}></span>
            </div>


        </Stack>
    )
}