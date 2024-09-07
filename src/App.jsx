

import { Container } from "react-bootstrap"
import { NavBar } from "./components/navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Chat } from "./pages/Chat"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/RegisterPage"
import { ToastContainer } from "react-toastify"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { ChatContextProvider } from "./context/ChatContext"



function App() {
 
  const {user} = useContext(AuthContext)

  return (
    <ChatContextProvider user={user}>
   
    
    <NavBar/>
    <Container>
      <Routes>
        <Route path="/" element={ user ? <Chat/> : <LoginPage/>}/>
        <Route path="/login" element={user ? <Chat/> : <LoginPage/>}/>
        <Route path="/register" element={!user ? <SignupPage/> : <Chat/>}/>
      </Routes>
    </Container>
   
    <ToastContainer theme="colored" autoClose={100} />

    </ChatContextProvider>
  )
}

export default App
