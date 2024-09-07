import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { Container, Stack } from "react-bootstrap"
import { UserChat } from "../components/chat/UserChat"
import { AuthContext } from "../context/AuthContext"
import { AllUsersChat } from "../components/chat/allUserChats"
import { ChatBox } from "../components/ChatBox"

export const Chat = () =>{

    const {user} = useContext(AuthContext)

    const {userChats,isLoading, updateCurrentChat } = useContext(ChatContext)

 
    return(
        <Container>
            <AllUsersChat/>
            {userChats?.length < 1 ? null : (
                <>
                <Stack direction="horizontal" gap={5} >
                    <Stack className="flex-grow-0 messages-box pe-3" gap={3}>

                        {
                            isLoading &&
                            <p>Chats are Loading................</p>
                        }
                        {
                            userChats?.map((chat, index)=>{
                                return(
                                    <div key={index} onClick={() => updateCurrentChat(chat)}>
                                        <UserChat chat={chat} user={user}/>
                                    </div>
                                )
                            })
                        }

                    </Stack>
                    <ChatBox/>
                </Stack>
                </>
            )}

           

        </Container>
    )
}