import { Stack } from "react-bootstrap"
import { useFetchRecipient } from "../../hooks/useFetchRecipient"
import avater from "../../assets/avater.svg"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { unReadNotificationsFun } from "../../utility/unreadNotifications"
import { useFecthcLatestMessage } from "../../hooks/useFetchLatestMessage"
import moment from "moment"

export const UserChat = ({chat, user}) =>{


    const {recipientUser} = useFetchRecipient(chat, user)

    const {onlineUser, notifications, markUserNotificationsAsRead} = useContext(ChatContext)

    const unReadNotifications = unReadNotificationsFun(notifications)

   
    const thisUserNotification = unReadNotifications?.filter(n => n.senderId === recipientUser?._id)
  

    const isUserOnline = onlineUser?.some((user)=> user?.userId === recipientUser?._id)

    const {latestMessasge} = useFecthcLatestMessage(chat)

    const lastText = (text) => {

        let shortText = text.substring(0,20)

        if(text.length > 20){
            shortText = shortText + "..."
        }

        return shortText;
    }

   
    return(
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between " role="button"
        onClick={()=> {
            if(thisUserNotification?.length !== 0){
                markUserNotificationsAsRead(thisUserNotification, notifications)
            }
        }}
        
        >

            <div className="d-flex">
                <div className="me-2">
                    
                    <img src={avater} alt="profile picture" height="35px" />

                </div>

                <div className="text-content">
                    <div className="name">
                        {recipientUser?.name}

                    </div>
                    <div className="text">
                        {
                            latestMessasge?.text && (
                                <span>
                                    {lastText(latestMessasge?.text)}
                                </span>
                            )
                        }

                    </div>

                </div>

            </div>

            <div className="d-flex flex-column align-items-end">

                <div className="date">{moment(latestMessasge?.createdAt).calendar()}</div>
                <div className={ thisUserNotification?.length > 0 ? "this-user-notifications" : ""}>

                    {
                        thisUserNotification?.length > 0 ? thisUserNotification?.length : ""
                    }
                </div>
                <span className= {isUserOnline ? "user-online" : ""}></span>
            </div>


        </Stack>
    )
}