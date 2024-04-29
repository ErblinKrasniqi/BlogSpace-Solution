import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPosts,
  getMyPosts,
  deletePost,
  getPost,
  createPost,
  loginUser,
  editPost,
  registerUser,
  delteUser,
  getUsers,
} from "../Api";
import { useAuth } from "../Auth/is-auth";

export const useApiGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getPosts(page);
      setPosts(data.data.posts);
      setTotalPosts(data.data.totalItems);

      console.log(totalPosts);
    } catch (error) {
      setPosts([]);
      setError(error);
    } finally {
      setLoaded(true);
    }
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loaded, error, setPage, totalPosts, page };
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
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const fetchPosts = async () => {
    try {
      const data = await getMyPosts();
      setPosts(data.data.posts);
    } catch (error) {
      setPosts([]);
      setApiError(error.response.data.message);
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
      setApiSuccess(response.data.message);
    } catch (error) {
      setApiError(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, [loaded]);

  return { posts, loaded, apiError, apiSuccess, handleDelete };
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

    if (!title) {
      setApiError("Please fill all the title field ⛔");
      return;
    }
    if (!description) {
      setApiError("Please fill all the description field ⛔");
      return;
    }

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
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const navigate = useNavigate();

  const { setIsLoggedIn, setRole } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (!email) {
      setApiError("Please fill all the email address field ⛔");
      return;
    }
    if (!password) {
      setApiError("Please fill all the password field ⛔");
      return;
    }
    try {
      const results = await loginUser(formData);
      localStorage.setItem("token", results.data.token);
      localStorage.setItem("userName", results.data.userName);
      localStorage.setItem("role", results.data.role);
      setRole(results.data.role);
      setIsLoggedIn(true);
      setApiSuccess(results.data.message);
      navigate("/");
    } catch (err) {
      setApiError(err.response.data.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,

    apiError,
    apiSuccess,
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
    console.log("Title:", title, "Description:", description, "Image:", image);
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
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);

    if (!name) {
      if (!email) {
        setApiError("Please fill all the email address field ⛔");
        return;
      }
      setApiError("Please fill all the name field ⛔");
      return;
    }
    if (!password) {
      setApiError("Please fill all the password field ⛔");
      return;
    }
    if (password !== comfirmPassword) {
      setApiError("Passwords do not match ⛔");
      return;
    }
    try {
      const results = await registerUser(formData);
      localStorage.setItem("token", results.data.token);
      localStorage.setItem("userName", results.data.userName);
      localStorage.setItem("role", results.data.role);
      setApiSuccess(results.data.message);

      navigate("/login");
    } catch (err) {
      setApiError(err.response.data.message);
    }
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
    apiError,
    apiSuccess,
    handleSubmit,
  };
};

export const useApiGetUsers = () => {
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
