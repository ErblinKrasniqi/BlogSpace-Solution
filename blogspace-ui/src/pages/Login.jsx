import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../Assets/scss/login.module.scss";
import { Link } from "react-router-dom";
import { useRef, useLayoutEffect } from "react";
import { useApiLogin } from "../Hooks/userHooks";
import Message from "../components/Message";

import anime from "animejs";

const Login = () => {
  const { setEmail, setPassword, handleSubmit, apiError, apiSuccess } =
    useApiLogin();

  const formPopUp = useRef(null);
  const textAppear = useRef([]);

  //Animations

  useLayoutEffect(() => {
    anime({
      targets: formPopUp.current,
      scale: [0, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
    });

    anime({
      targets: textAppear.current,
      translateX: [-200, 0],
      opacity: [0, 1],
      easing: "linear",
      duration: 500,
      delay: anime.stagger(50, { start: 1000 }),
    });
  }, []);

  return (
    <Container
      fluid
      className={`d-flex justify-content-center align-items-center    ${styles.container}`}
    >
      {apiSuccess || apiError ? (
        <Message
          message={apiSuccess ? apiError : apiError}
          type={apiError ? "danger" : "success"}
        />
      ) : null}
      <Col ref={formPopUp} md={5} className={` rounded-4 ${styles.column}`}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>

          <Form.Text className="text-muted"></Form.Text>
          <div>
            {" "}
            <Form.Text className="text-white">
              <p
                ref={(el) => (textAppear.current[0] = el)}
                className="text-white m-0 p-0"
              >
                Don't have an account?
              </p>{" "}
              <Link ref={(el) => (textAppear.current[1] = el)} to="/register">
                {" "}
                Sign up
              </Link>
            </Form.Text>
          </div>

          <Button variant="primary" type="submit" className="py-2 px-4 mt-2">
            Login
          </Button>
          <div className="d-flex justify-content-center">
            {apiError && (
              <Form.Text className="text-danger">{apiError.message}</Form.Text>
            )}
          </div>
        </Form>
      </Col>
    </Container>
  );
};
export default Login;
