import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../../Assets/scss/login.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    try {
      const results = await axios.post(
        "http://localhost:8080/api/post",

        formData,

        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setApiSuccess(results.data.message);
      setApiError("");
      console.log(results);
    } catch (error) {
      setApiSuccess("");
      setApiError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Container
      className={`d-flex justify-content-center  mt-5 ${styles.container}`}
    >
      <Col md={5} className={` rounded-4 ${styles.column}`}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={4}
              placeholder="Description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Text className="text-muted"></Form.Text>

          <Button variant="primary" type="submit" className="py-2 px-4 mt-2">
            Submit
          </Button>
          <div className="d-flex justify-content-center">
            <p className="text-danger">{apiError}</p>
            <p className="text-success">{apiSuccess}</p>
          </div>
        </Form>
      </Col>
    </Container>
  );
};
export default CreatePost;
