import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { AxiosResponse } from "axios"
import type { IResponse, Icredentials } from "../types/types";
import authService from "../services/login"
import { useNavigate } from "react-router-dom"

function Login() {
 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const navigate = useNavigate()
  
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const credentials: Icredentials = { email, password }
        const response: AxiosResponse<IResponse> = await authService.login(
         credentials
        )
        console.log(response.data.firstName)
        
        localStorage.setItem("user", response.data.firstName)
        navigate("/questions")
    } catch (error: unknown ) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-60">
      <div className="border rounded p-4 shadow" style={{ width: "350px" }}>
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}  />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </div>
    </div>
  );
}

export default Login;