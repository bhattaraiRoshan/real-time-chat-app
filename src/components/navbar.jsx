import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

export const NavBar = () =>{

   return(

    <Navbar bg="dark" className="mb-4" style={{height: "3.5rem"}}>
        <Container>
            <h3>
                <Link to="/" className="link-light text-decoration-none"> Chat App</Link>
            </h3>
            <Nav>
                <Stack direction="horizontal" gap={3}>
                <Link to="/login" className="link-light text-decoration-none">Login</Link>
                <Link to="/register" className="link-light text-decoration-none">Register</Link>
                </Stack>
            </Nav>
        </Container>

    </Navbar>
   )
}