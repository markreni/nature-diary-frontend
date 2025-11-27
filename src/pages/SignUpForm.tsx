import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import type { AxiosError, AxiosResponse } from "axios";
import type { IsignUp, IResponse, IError } from "../types/types";
import authService from "../services/signup";
import validator from "validator";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errors, setErrors] = useState<IError>({ message: [], type: "" });

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: string[] = [];
    if (!validator.isEmail(email)) {
      newErrors.push("Invalid email");
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 2,
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 1,
      })
    ) {
      newErrors.push(
        "Please enter a stong password.\n" +
          "Password leangth should be minmum 8 characters long.\n" +
          "Should have minimum 2 lowercase characters.\n" +
          "Should have minimum 1 uppercase character.\n" +
          "Should have minimum 2 numbers.\n" +
          "Should have minimum 2 symbols"
      );
    }

    if (retypePassword === "") {
      newErrors.push("Please retype password.");
    }
    if (retypePassword !== "" && password !== retypePassword) {
      newErrors.push("Please retype password corrently.");
    }

    setErrors({ message: [...new Set(newErrors)], type: "error" });

    //
    if (newErrors.length === 0) {
      try {
        const signUp: IsignUp = { firstName, lastName, email, password };
        const response: AxiosResponse<IResponse> = await authService.signUp(
          signUp
        );
        console.log(response);
        if (response.data.success === true) {
          //setEmail("");
          //setPassword("");
          //setRetypePassword("");
          newErrors.push("Registration is successful. Please login.");
          setErrors({ message: [...new Set(newErrors)], type: "success" });
          setTimeout(() => navigate("/login"), 1000);
        } else if (response.data.success === false) {
          newErrors.push(response.data.message);
          setErrors({ message: [...new Set(newErrors)], type: "error" });
        }
      } catch (err) {
        const error = err as AxiosError<IResponse>;

        console.log(error);

        if (error.response?.data?.message) {
          setErrors({
            message: [error.response.data.message],
            type: "error",
          });
        } else {
          setErrors({
            message: ["Something went wrong. Please try again."],
            type: "error",
          });
        }
      }
    }
    //
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border rounded p-4 shadow" style={{ width: "350px" }}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="retypePassword">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control
              type="password"
              value={retypePassword}
              onChange={(e) => {
                setRetypePassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <p>&nbsp;</p>
        {errors.message.length > 0 ? (
          <CustomAlert errorMsg={errors.message} type={errors.type} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SignUpForm;
