import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../Assets/scss/login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerUser } from "../Api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);

    let tempErrors = [];
    if (!email) {
      tempErrors.push("Please fill all the email address field ⛔");
      setErrors(tempErrors);
      return;
    }
    if (!name) {
      tempErrors.push("Please fill all the name  field ⛔");
      setErrors(tempErrors);
      return;
    }
    if (!password) {
      tempErrors.push("Please fill all the password field ⛔");
      setErrors(tempErrors);
      return;
    }
    if (password !== comfirmPassword) {
      setPasswordMatch("Password does not match 🤔");
      setErrors(tempErrors);
      return;
    }
    try {
      const data = await registerUser(formData);
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setApiError(error.response.data);
    }
    setErrors(tempErrors);
  };

  return (
    <Container
      className={`d-flex justify-content-center  mt-5 ${styles.container}`}
    >
      <Col md={5} className={` rounded-4 ${styles.column}`}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
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
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="string"
              placeholder="Enter name"
            />
            {errors && (
              <Form.Text className="text-danger">{errors[1]}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3">
            <Form.Label>Comfirm password</Form.Label>
            <Form.Control
              onChange={(e) => {
                setComfirmPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Password"
            />
            {passwordMatch && (
              <Form.Text className="text-danger">{passwordMatch}</Form.Text>
            )}
          </Form.Group>

          <Form.Text className="text-muted"></Form.Text>
          <div>
            {" "}
            <Form.Text className="text-white">
              Already have an account? <br /> <Link to="/login"> Login</Link>
            </Form.Text>
          </div>

          <Button variant="primary" type="submit" className="py-2 px-4 mt-2">
            Register
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
export default Register;
