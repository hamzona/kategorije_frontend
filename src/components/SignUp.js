import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useSingupMutation } from "../features/auth/authApiSlice";
import { Button, Container, Form } from "react-bootstrap";

const Singup = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [singup, { isLoading }] = useSingupMutation();
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
      const userData = await singup({ user, pwd }).unwrap();
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
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Sing up</h1>

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
          If you have account already <Link to={"/login"}>login</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};
export default Singup;
