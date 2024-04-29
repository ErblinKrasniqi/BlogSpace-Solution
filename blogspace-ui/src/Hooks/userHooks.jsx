import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPosts,
  getMyPosts,
  deletePost,
  getPost,
  createPost,
  loginUser,
  registerUser,
  delteUser,
  getUsers,
} from "../Api";
import { useAuth } from "../Auth/is-auth";

export const useApiGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getPosts();
      setPosts(data.data.posts);
    } catch (error) {
      setPosts([]);
      setError(error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loaded, error };
};

export const useApiGetPost = (id) => {
  const [post, setPost] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const fetchPost = useCallback(async () => {
    try {
      const data = await getPost(id);
      setPost(data.data.post);
    } catch (error) {
      setPost("");
      setError(error);
    } finally {
      setLoaded(true);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 500);
    fetchPost();
  }, [fetchPost]);

  return { post, loaded, error };
};

export const useApiFetchUserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const data = await getMyPosts();
      setPosts(data.data.posts);
    } catch (error) {
      setPosts([]);
      setError(error);
    } finally {
      setLoaded(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      console.log("deletePost response:", response);
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((post) => post._id !== id);
        return updatedPosts;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, [loaded]);

  return { posts, loaded, error, handleDelete };
};

export const useApiCreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const results = await createPost(formData);

      setApiSuccess(results.data.message);
      setApiError("");
    } catch (error) {
      setApiSuccess("");
      setApiError(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    apiError,
    apiSuccess,
    handleSubmit,
  };
};

export const useApiLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const { setIsLoggedIn, setRole } = useAuth();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    apiError,
    handleSubmit,
  };
};

export const useApiEditPost = (id) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [post, setpost] = useState("");

  const gettingPost = useCallback(async () => {
    try {
      const results = await getPost(id);
      setpost(results.data.post);
      setDescription(post.description);
      setTitle(post.title);
    } catch (error) {
      console.log(error);
    }
  }, [id, post.description, post.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const results = await createPost(formData);

      setApiSuccess(results.data.message);
      setApiError("");
    } catch (error) {
      setApiSuccess("");
      setApiError(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    gettingPost();
  }, [gettingPost]);

  return {
    title,
    setTitle,
    description,
    setDescription,

    setImage,
    apiError,
    apiSuccess,
    handleSubmit,
  };
};

export const useApiRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    let tempErrors = [];
    if (!name) {
      tempErrors.push("Please fill all the name field ⛔");
      return;
    }
    if (!email) {
      tempErrors.push("Please fill all the email address field ⛔");
      return;
    }
    if (!password) {
      tempErrors.push("Please fill all the password field ⛔");
      return;
    }
    if (password !== comfirmPassword) {
      tempErrors.push("Passwords do not match ⛔");
      return;
    }
    try {
      const results = await registerUser(formData);
      localStorage.setItem("token", results.data.token);
      localStorage.setItem("userName", results.data.userName);
      localStorage.setItem("role", results.data.role);
      navigate("/login");
    } catch (err) {
      setApiError(err.response.data);
    }

    setErrors(tempErrors);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    setComfirmPassword,
    errors,
    apiError,
    handleSubmit,
  };
};

export const useApiGetUsers = (id) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    try {
      const results = await delteUser(id);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user._id !== id);
        return updatedUsers;
      });
      console.log(results);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const getUsersHandler = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.users);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersHandler();
  }, [loading]);

  return { users, loading, error, handleDelete };
};
