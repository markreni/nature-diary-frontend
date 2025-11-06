import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { AxiosResponse } from "axios"
import type { IsignUp, IResponse } from "../types/types";
import authService from "../services/signup"

function SignUpForm() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const signUp: IsignUp = { firstName, lastName, email, password }
        const response: AxiosResponse<IResponse> = await authService.signUp(
         signUp
        )
        console.log(response.data)
    } catch (error: unknown ) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border rounded p-4 shadow" style={{ width: "350px" }}>
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="retypePassword">
        <Form.Label>Retype Password</Form.Label>
        <Form.Control type="password" value={retypePassword} onChange={(e) => {setRetypePassword(e.target.value)}} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
    </div>
    </div>
  );
}

export default SignUpForm;