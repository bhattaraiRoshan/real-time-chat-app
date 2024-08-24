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