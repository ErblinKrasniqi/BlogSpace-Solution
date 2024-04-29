import { Container, Form, Col, Button } from "react-bootstrap";
import styles from "../../Assets/scss/login.module.scss";
import { useApiEditPost } from "../../Hooks/userHooks";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";

const EditPost = () => {
  let { id } = useParams();
  const {
    title,
    setTitle,
    description,
    setDescription,
    setImage,
    apiError,
    apiSuccess,
    handleSubmit,
  } = useApiEditPost(id);

  return (
    <Container
      className={`d-flex justify-content-center  mt-5 ${styles.container}`}
    >
      {apiSuccess || apiError ? (
        <Message
          message={apiSuccess ? apiSuccess : apiError}
          type={apiSuccess ? "success" : "danger"}
        />
      ) : null}
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
        </Form>
      </Col>
    </Container>
  );
};
export default EditPost;
