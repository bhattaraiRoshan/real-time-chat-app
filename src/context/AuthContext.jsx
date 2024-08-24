import {  createContext, useCallback, useEffect, useState } from "react";
import { loginUser, signUpUser } from "../entity/PrivateRouter";
import { toast } from "react-toastify";
import { json, useNavigate } from "react-router-dom";


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

    const [loginObj, setLoginObj] = useState({

   
        email: "",
        password: "",
    })

    useEffect(()=>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    },[])

    const updateSingUpObj = useCallback((userObj)=>{
        setSingUpObj(userObj)
    }, [])

    const updateLoginObj = useCallback((userObj)=>{
        setLoginObj(userObj)
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

        localStorage.setItem("User", JSON.stringify(singUpUserss.data))
        toast.success(singUpUserss.message)
        setUser(singUpObj)
        navigate("/login")
        setIsLocading(false)



    }, [singUpObj])

    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User")
        navigate("/login")
        setUser(null)
    },[])


    const loginUsers = useCallback( async(e)=>{
        e.preventDefault()
        setIsLocading(true)

        console.log(loginObj);
        const result = await loginUser(loginObj)


        if(result?.status === "error"){
            setIsLocading(false)
            setSingUpObj({
              
                email: "",
                password: "",
            })
           return toast.error(result.message)
        }

        localStorage.setItem("User", JSON.stringify(result.data))
        toast.success(result.message)
        setUser(loginObj)
        navigate("/login")
        setIsLocading(false)


    },[loginObj])

    
  
    return <AuthContext.Provider value={{user, singUpObj, updateSingUpObj, singUpUsers, singUpError, isLoading, logoutUser, loginUsers, updateLoginObj, loginObj, }}>
        {children}
    </AuthContext.Provider>
}