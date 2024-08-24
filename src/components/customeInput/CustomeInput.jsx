import { Form } from "react-bootstrap";

export const CustomeInput = (props) =>{

    const { label, inputAttributes, handelOnChage} = props

    return (
        <Form.Group className="mb-3">
            <Form.Label className="fw-bold">{label}</Form.Label>
            <Form.Control {...inputAttributes} onChange={(e) => handelOnChage(e)}/>
          </Form.Group>
       );
    
}