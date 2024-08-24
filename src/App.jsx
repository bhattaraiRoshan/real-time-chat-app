

import { Container } from "react-bootstrap"
import { NavBar } from "./components/navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Chat } from "./pages/Chat"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/RegisterPage"
import { ToastContainer } from "react-toastify"



function App() {
 

  return (
    <>
   
    
    <NavBar/>
    <Container>
      <Routes>
        <Route path="/" element={<Chat/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<SignupPage/>}/>
      </Routes>
    </Container>
   
    <ToastContainer theme="colored" autoClose={100} />

    </>
  )
}

export default App
