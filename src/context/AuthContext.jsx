import {  createContext, useCallback, useState } from "react";
import { signUpUser } from "../entity/PrivateRouter";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()


export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const[singUpError, setSingUpError] = useState(null)
    const [isLoading, setIsLocading] = useState(null)

    const [singUpObj, setSingUpObj] = useState({

   
        name: "",
        email: "",
        password: "",
    })

    const updateSingUpObj = useCallback((userObj)=>{
        setSingUpObj(userObj)
    }, [])

    const navigate = useNavigate()
    const singUpUsers = useCallback( async(e)=>{
        e.preventDefault()

        setIsLocading(true)
        setSingUpError(null)
        const singUpUserss = await signUpUser(singUpObj)

       
        if(singUpUserss?.status === "error"){
            setIsLocading(false)
            setSingUpObj({
                name: "",
                email: "",
                password: "",
            })
           return toast.error(singUpUserss.message)
        }
        
        toast.success(singUpUserss.message)
        setUser(singUpObj)
        navigate("/login")
        setIsLocading(false)



    }, [singUpObj])

    console.log(singUpObj);
    return <AuthContext.Provider value={{user, singUpObj, updateSingUpObj, singUpUsers, singUpError, isLoading}}>
        {children}
    </AuthContext.Provider>
}