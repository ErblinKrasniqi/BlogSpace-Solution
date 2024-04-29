import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../Assets/scss/login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useAuth } from "../Auth/is-auth";
import { loginUser } from "../Api";
import anime from "animejs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  //Animation references
  const formPopUp = useRef(null);
  const textAppear = useRef([]);

  const { setIsLoggedIn, setRole } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    let tempErrors = [];
    if (!email) {
      tempErrors.push("Please fill all the email address field ⛔");
      return;
    }
    if (!password) {
      tempErrors.push("Please fill all the password field ⛔");
      return;
    }
    try {
      const results = await loginUser(formData);
      localStorage.setItem("token", results.data.token);
      localStorage.setItem("userName", results.data.userName);
      localStorage.setItem("role", results.data.role);
      setRole(results.data.role);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setApiError(err.response.data);
    }

    setErrors(tempErrors);
  };

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
      className={`d-flex justify-content-center  mt-5 ${styles.container}`}
    >
      <Col ref={formPopUp} md={5} className={` rounded-4 ${styles.column}`}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            {errors && (
              <Form.Text className="text-danger">{errors[0]}</Form.Text>
            )}
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
            {errors && (
              <Form.Text className="text-danger">{errors[1]}</Form.Text>
            )}
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
