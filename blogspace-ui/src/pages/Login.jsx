import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../Assets/scss/login.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = [];
    if (!email) {
      tempErrors.push("Please fill all the email address field ⛔");
    }
    if (!password) {
      tempErrors.push("Please fill all the password field ⛔");
    }
    setErrors(tempErrors);
  };

  return (
    <Container
      className={`d-flex justify-content-center  mt-5 ${styles.container}`}
    >
      <Col md={5} className={` rounded-4 ${styles.column}`}>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
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
              Don't have an account? <br /> <Link to="/register"> Sign up</Link>
            </Form.Text>
          </div>

          <Button variant="primary" type="submit" className="py-2 px-4 mt-2">
            Login
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
export default Login;
