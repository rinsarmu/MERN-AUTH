import { useState } from "react";
import {Link } from 'react-router-dom'
import {Form, Button, Col, Row, } from 'react-bootstrap'
import FormContainer from "../FormContainer";

const LoginScreen =()=>{
    const[email, setEmail]= useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async(e)=>{
        e.preventDefault();
        alert()
    }
    return(
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <h1>Sign in</h1>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e)=>setEmail(e.target.value)}
                        >

                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={password}
                        placeholder="Enter password"
                        onChange={(e)=>setPassword(e.target.value)}

                        >

                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type='submit' className='mt-3'>
                    Log in
                </Button>

                <Row className="py-3">
                    <Col>
                    Don't have an account? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>

        </FormContainer>
    )
}

export default LoginScreen