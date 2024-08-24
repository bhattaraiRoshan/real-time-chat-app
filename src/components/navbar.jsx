import { useContext } from "react"
import { Container, Nav, Navbar, Stack, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const NavBar = () =>{

    const {user, logoutUser} = useContext(AuthContext)

   return(

    <Navbar bg="dark" className="mb-4" style={{height: "3.5rem"}}>
        <Container>
            <h3>
                <Link to="/" className="link-light text-decoration-none"> Chat App</Link>
            </h3>
           {
            user && <span className="text-success">Welcome {user?.name}</span>
           }
            <Nav>
                <Stack direction="horizontal" gap={3}>
                {
                    !user && 
                    <>
                   
                    <Link to="/login" className="link-light text-decoration-none">Login</Link>
                <Link to="/register" className="link-light text-decoration-none">Register</Link>
                </>
                }
                {
                    user && 
                    <>
                    <Button variant="danger" onClick={()=> logoutUser()}>Logout</Button>
                    </>
                }
                </Stack>
            </Nav>
        </Container>

    </Navbar>
   )
}