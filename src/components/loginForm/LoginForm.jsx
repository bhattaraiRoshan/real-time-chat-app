import { Form, Row, Stack,Col, Placeholder, Button } from "react-bootstrap"
import { loginFormFields } from "./LoginFormFields"
import { CustomeInput } from "../customeInput/CustomeInput"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const LoginForm = () =>{


    const {loginUsers, updateLoginObj, loginObj, isLoading } = useContext(AuthContext)

    const handelOnChage = (e) => {
        const {name, value} = e.target
        updateLoginObj({...loginObj, [name]:value})
     }

    return(
        <>
        
        <Form onSubmit={(e) => loginUsers(e)}>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "10%"
            }}>
                <Col xs={6}>
                <Stack gap={3}>
                    <h3>Login</h3>
                    {
                        loginFormFields.map((field, index)=>
                        <CustomeInput
                        
                        key={index}
                        label = {field.label}
                        handelOnChage = {handelOnChage}
                        inputAttributes = {{
                            type: field.type,
                            name: field.name,
                            placeholder: field.placeholder,
                            required: true
                        }}
                        
                        />
                        )
                    }

                    <Button variant="primary" type="submit">
                        {isLoading ? "Logging in": "Login"}
                    </Button>
                </Stack>
                </Col>
            </Row>
        </Form>

        </>
    )
}