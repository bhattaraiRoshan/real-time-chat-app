import { Form } from "react-bootstrap";

export const CustomeInput = (props) =>{
/* This code defines a React functional component called `CustomeInput`. It takes in `props` as its
parameter. The `props` object is then destructured to extract `label`, `inputAttributes`, and
`handelOnChage` from it. */

    const { label, inputAttributes, handelOnChage} = props

    return (
        <Form.Group className="mb-3">
            <Form.Label className="fw-bold">{label}</Form.Label>
            <Form.Control {...inputAttributes} onChange={(e) => handelOnChage(e)}/>
          </Form.Group>
       );
    
}