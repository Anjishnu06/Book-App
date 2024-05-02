import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if(firebase.isLoggedIn){
        //navigate to Home
        navigate("/");
    }
  },[navigate,firebase]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const result = await firebase.signinUserWithEmailAndPass(email,password);
    alert('Login Successful');
  }

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <hr/>
        <h3 className="mt-1 mb-1">OR</h3>
        <hr/>
        <Button onClick={firebase.signinWithGoogle} variant="danger">Sign In With Google</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
