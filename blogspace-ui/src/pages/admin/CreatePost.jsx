import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../../Assets/scss/login.module.scss";
import { useEffect } from "react";

const CreatePost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      className={`d-flex justify-content-center  mt-5 ${styles.container}`}
    >
      <Col md={5} className={` rounded-4 ${styles.column}`}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Description" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Text className="text-muted"></Form.Text>

          <Button variant="primary" type="submit" className="py-2 px-4 mt-2">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};
export default CreatePost;
