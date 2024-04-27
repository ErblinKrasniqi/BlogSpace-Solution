import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../../Assets/scss/login.module.scss";
import { useEffect, useState } from "react";
import { editPost, getPost } from "../../Api";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [post, setpost] = useState("");
  const [loaded, setLoaded] = useState(false);
  let { id } = useParams();

  const gettingPost = async () => {
    try {
      const results = await getPost(id);
      setpost(results.data.post);
      setLoaded(true);
      setDescription(post.description);
      setTitle(post.title);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    try {
      const results = await editPost(id, formData);
      setApiSuccess(results.data.message);
      setApiError("");
    } catch (error) {
      setApiSuccess("");
      setApiError(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    gettingPost();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [loaded]);

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
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={4}
              placeholder="Description"
              value={description}
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
export default EditPost;
