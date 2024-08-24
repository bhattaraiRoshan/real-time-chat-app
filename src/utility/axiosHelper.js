import axios from "axios"
import { getNewAccessJwt } from "../entity/PrivateRouter";



const getRefreshJWT = () =>{

    const token = localStorage.getItem("refreshJWT");
    return token;
}

const getAccessJWT = () =>{
    const token = sessionStorage.getItem("accessJWT");
    return token;
    
}

export const axiosConfig = ()=> {
    return {
      headers : {
        Authorization: getAccessJWT(),
      }
    }
}


export const axiosApiCall = async (axiosParams) =>{

    const {method, url, data, isPrivate, useRefreshToken} = axiosParams

    const token = useRefreshToken ? getRefreshJWT() : getAccessJWT()

    const headers = {

        Authorization : isPrivate ? token : null
    }

    try {
        const response = await axios({
            method,
            url,
            data,
            headers
        })

        // handel the case when you get error form api response 

        if(response.data.status === "error"){
            throw { message: response.data.message}
        }

        return response.data
    } catch (error) {
        // if access token is expired, try to get new access token using refressh token 
        // and then fire the same api call again 

        if(error.message === "jwt expired"){
            const result = await getNewAccessJwt()
        
            if(result?.status === "success"){
                sessionStorage.setItem("accessJWT", result.data)

                return axiosApiCall(axiosParams)
            }
        }

        return {status: "error", message: error.message || "something went worng" }
    }


}