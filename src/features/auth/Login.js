import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(user, pwd);
      const userData = await login({ user, pwd }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      //errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
      //className="align-items-centar d-flex flex-column h-100 align-items-center justify-content-center"
    >
      <h1>Login</h1>

      <Form
        noValidate
        //validated={validated}
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Form.Group>
          <Form.Label>nickname</Form.Label>

          <Form.Control
            ref={userRef}
            type="text"
            value={user}
            onChange={handleUserInput}
            placeholder="nickname"
            required
          />
          {/* <Form.Control.Feedback type="invalid">
            Nickname is required!!
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group>
          <Form.Label>password</Form.Label>

          <Form.Control
            type="password"
            value={pwd}
            onChange={handlePwdInput}
            placeholder="password"
            required
          />
          {/* <Form.Control.Feedback type="invalid">
            Password is required!!
          </Form.Control.Feedback> */}
        </Form.Group>

        <Button style={{ marginTop: "15px" }} type="submit">
          submit
        </Button>
        <Form.Text muted>
          If you dont have account already <Link to={"/singup"}>singup</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};
export default Login;
