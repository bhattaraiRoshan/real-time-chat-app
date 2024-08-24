import { Form, Row, Stack,Col, Placeholder, Button } from "react-bootstrap"
import { loginFormFields } from "./LoginFormFields"
import { CustomeInput } from "../customeInput/CustomeInput"

export const LoginForm = () =>{

    const handelOnChage = () => {

    }

    return(
        <>
        
        <Form>
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

                    <Button variant="primary" type="submit">Login </Button>
                </Stack>
                </Col>
            </Row>
        </Form>

        </>
    )
}