import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../Assets/scss/login.module.scss";
import { Link } from "react-router-dom";
import { useApiRegister } from "../Hooks/userHooks";
import Message from "../components/Message";

const Register = () => {
  const {
    setEmail,
    setPassword,
    setComfirmPassword,
    setName,
    handleSubmit,
    apiSuccess,
    apiError,
  } = useApiRegister();

  return (
    <Container
      className={`d-flex justify-content-center  mt-5 ${styles.container}`}
    >
      {apiSuccess || apiError ? (
        <Message
          message={apiSuccess ? apiError : apiError}
          type={apiError ? "danger" : "success"}
        />
      ) : null}
      <Col md={5} className={` rounded-4 ${styles.column}`}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
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
