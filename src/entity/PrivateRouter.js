import { json } from "react-router-dom"
import { axiosApiCall } from "../utility/axiosHelper"




const user_api_url = import.meta.env.VITE_APP_BASE_URL

// Sing Up

export const signUpUser = (userObj) =>{

    return axiosApiCall({
        method: "post",
        url: `${user_api_url}/api/user/register`,
        data: userObj,
    })
}


// login 

export const loginUser = (userObj) =>{

    return axiosApiCall({
        method: "post",
        url: `${user_api_url}/api/user/login`,
        data: userObj,
    })
}



export const getNewAccessJwt = () =>{
    return  axiosApiCall({
          method:"get",
          url: `${user_api_url}/accessjwt`,
          isPrivate: true,
          useRefreshToken: true,
      })
}


// get one user 

export const getOneUser = (_id) =>{

    return axiosApiCall({
        method: "get",
        url: `${user_api_url}/api/user/find/${_id}`
    })
}


// get all user

export const getAllUser = () =>{

    return axiosApiCall({
        method: "get",
        url: `${user_api_url}/api/user/getalluser`
    })
}



// get all chat


export const getUserChat = (userId) =>{

    return axiosApiCall({
        method: "get",
        url: `${user_api_url}/api/chats/${userId}`
    })
}

// find the chat 

export const findUserChat = (userId) =>{

    

    return axiosApiCall({
        method: "get",
        url: `${user_api_url}/api/chats/find/${userId}`
    })
}


// create Chat 

export const createChats = (firstId, secondId) =>{

    return axiosApiCall({
        method: "post",
        url: `${user_api_url}/api/chats`,
        data:{
            firstId,
            secondId
        }
    })
}


// get messages 

export const getCurrentChat = (_id) =>{

    return axiosApiCall({
        method: "get",
        url: `${user_api_url}/api/messages/${_id}`
    })
}
