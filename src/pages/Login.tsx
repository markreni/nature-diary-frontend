import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import type { AxiosResponse } from "axios";
import type { IError, ILogInResponse, Icredentials } from "../types/types";
import authService from "../services/login";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import CustomAlert from "../components/CustomAlert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IError>({ message: [], type: "" });

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // Validate email
    if (!validator.isEmail(email)) {
      newErrors.push("Invalid email");
    }

    // Validate password
    if (validator.isEmpty(password)) {
      newErrors.push("Please enter password");
    }

    // Show the error message
    if (newErrors.length > 0) {
      setErrors({ message: [...new Set(newErrors)], type: "error" });
      return;
    }

    try {
      const credentials: Icredentials = { email, password };
      const response: AxiosResponse<ILogInResponse> = await authService.login(
        credentials
      );

      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", response.data.firstName);

        setErrors({
          message: [response.data.msg || "Login successful! Redirecting..."],
          type: "success",
        });

        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrors({
          message: [response.data.msg || "Invalid email or password"],
          type: "error",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({
          message: [error.message || "Login failed. Please try again."],
          type: "error",
        });
        console.error(error.message);
      } else {
        console.error("Unknown error occurred", error);
        setErrors({
          message: ["Login failed. Please try again."],
          type: "error",
        });
      }
    }

    /*if (newErrors.length === 0) {
      //
      try {
        const credentials: Icredentials = { email, password };
        const response: AxiosResponse<ILogInResponse> = await authService.login(
          credentials
        );

        localStorage.setItem("user", response.data.firstName);
        navigate("/questions");
      } catch (error: unknown) {
        console.log(error);
      }
      //
    }*/
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-60">
      <div className="border rounded p-4 shadow" style={{ width: "350px" }}>
        <Form onSubmit={submitHandler}>
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
          <Button variant="primary" type="submit">
            Login
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

export default Login;
