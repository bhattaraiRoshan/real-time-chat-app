import { Form, Row, Stack,Col, Placeholder, Button, Alert } from "react-bootstrap"

import { CustomeInput } from "../customeInput/CustomeInput"
import { SignUpFormFields } from "./SignupFormFields"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const SingupForm = () =>{

   const {singUpObj, updateSingUpObj, singUpUsers, singUpError, isLoading } =  useContext(AuthContext)

    const handelOnChage = (e) => {
       const {name, value} = e.target
        updateSingUpObj({...singUpObj, [name]:value})
    }

    return(
        <>
        
        <Form onSubmit={(e)=>singUpUsers(e)}>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "5%",
                
            }}>
                <Col xs={6}>
                <Stack gap={3}>
                    <h3>Sing Up</h3>
                    {
                        SignUpFormFields.map((field, index)=>
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
                        {isLoading ? "Loading.........." : "Sign Up"}
                    </Button>

                   
                </Stack>
                </Col>
            </Row>
        </Form>

        </>
    )
}