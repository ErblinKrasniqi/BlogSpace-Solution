import { useEffect, useState, useCallback, useRef } from "react";
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
  deleteComment,
  createComment,
  searchPost,
} from "../Api";
import { useAuth } from "../Auth/is-auth";

//User hooks
export const useApiRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [counter, setCounter] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const graphqlQuery = {
      query: `
    mutation {
    createUser(userInput: {email: "${email}", name: "${name}", password: "${password}"}) {
    _id
    email
    message
  }
}
      `,
    };
    if (!email) {
      setCounter((counter) => !counter);
      setApiError("Please fill all the email address field ⛔");
      return;
    }
    if (!name) {
      setCounter((counter) => !counter);
      setApiError("Please fill all the name field ⛔");
      return;
    }
    if (!password) {
      setCounter((counter) => !counter);
      setApiError("Please fill all the password field ⛔");
      return;
    }
    if (password !== comfirmPassword) {
      setCounter((counter) => !counter);
      setApiError("Passwords do not match ⛔");
      return;
    }
    try {
      const results = await registerUser(graphqlQuery);
      if (results.errors) {
        const error = new Error("NOT WORKING");
        throw error;
      }
      setApiSuccess(results.message);

      navigate("/login");
    } catch (err) {
      setCounter((counter) => !counter);
      console.log(err.response.data.errors[0].message);
      setApiError(err.response.data.errors[0].message);
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
    counter,
  };
};

export const useApiLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [counter, setCounter] = useState(true);
  const navigate = useNavigate();

  const { setIsLoggedIn, setRole } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const graphqlQuery = {
      query: `
{
  login(email: "erblini.kr@gmail.com", password: "123456"){userId userName role token message}
}
`,
    };

    if (!email) {
      setCounter((counter) => !counter);
      setApiError("Please fill all the email address field ⛔");
      return;
    }
    if (!password) {
      setCounter((counter) => !counter);
      setApiError("Please fill all the password field ⛔");
      return;
    }
    try {
      const results = await loginUser(graphqlQuery);
      console.log(results);
      localStorage.setItem("token", results.token);
      localStorage.setItem("userName", results.userName);
      localStorage.setItem("role", results.role);
      localStorage.setItem("userId", results.userId);

      setRole(results.role);
      setIsLoggedIn(true);
      setApiSuccess(results.message);
      navigate("/");
    } catch (err) {
      setCounter((counter) => !counter);
      setApiError(err.response.data.message);
      console.log(err);
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
    counter,
    apiError,
    apiSuccess,
    handleSubmit,
  };
};

export const useApiFetchUserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [counter, setCounter] = useState(true);

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

      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((post) => post._id !== id);
        return updatedPosts;
      });
      setCounter((counter) => !counter);
      setApiSuccess(response.data.message);
    } catch (error) {
      setApiError(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, [loaded]);

  return { posts, loaded, apiError, apiSuccess, handleDelete, counter };
};

//Post hooks

export const useApiGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [searchRsults, setSearchResults] = useState([]);

  function useDebouncedCallback(callback, delay) {
    const timeoutRef = useRef();

    return useCallback(
      (...args) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay]
    );
  }

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getPosts(page);
      setPosts(data.data.posts);
      setTotalPosts(data.data.totalItems);
    } catch (error) {
      setPosts([]);
      setError(error);
    } finally {
      setLoaded(true);
    }
  }, [page]);

  const searchPosts = async (query) => {
    try {
      if (query === "") {
        setSearchResults([]);
        return;
      }
      const data = await searchPost(query);
      setSearchResults(data.data.posts);
    } catch (error) {
      setSearchResults([]);
      setError(error);
    }
  };

  const debouncedSearchPosts = useDebouncedCallback(searchPosts, 500);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loaded,
    error,
    setPage,
    totalPosts,
    page,
    searchPosts,
    searchRsults,
    debouncedSearchPosts,
  };
};

export const useApiGetPost = (id) => {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [apiError, setApiError] = useState("");
  const [content, setContent] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const createCommeta = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("postId", id);
    try {
      const data = await createComment(formData);

      setComments((prevComments) => [...prevComments, data.data.comment]);
      setApiSuccess(data.data.message);
    } catch (error) {
      setApiError(error.response.data.message);
    }
  };

  const delteComment = async (id) => {
    try {
      await deleteComment(id);
      setComments((prevComments) => {
        const updatedComments = prevComments.filter(
          (comment) => comment._id !== id
        );
        return updatedComments;
      });
    } catch (err) {
      setApiError(err.response.data.message);
    }
  };

  const fetchPost = useCallback(async () => {
    try {
      const data = await getPost(id);
      setPost(data.data.post);
      setComments(data.data.comments);
    } catch (error) {
      setPost("");
      setApiError(error);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 500);

    fetchPost();
  }, [fetchPost]);

  return {
    post,
    apiError,
    comments,
    delteComment,
    createCommeta,
    setContent,
    apiSuccess,
  };
};

export const useApiCreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [counter, setCounter] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    if (!title) {
      setCounter((counter) => !counter);
      setApiError("Please fill the title field ⛔");
      return;
    }
    if (!description) {
      setCounter((counter) => !counter);
      setApiError("Please fill all the description field ⛔");
      return;
    }

    try {
      const results = await createPost(formData);

      setCounter((counter) => !counter);
      setApiSuccess(results.data.message);
      setApiError("");
    } catch (error) {
      setApiSuccess("");
      setCounter((counter) => !counter);
      setApiError(error.response.data.message);
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
    counter,
  };
};

export const useApiEditPost = (id) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [post, setpost] = useState("");
  const [counter, setCounter] = useState(true);

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
      const results = await editPost(id, formData);

      setCounter((counter) => !counter);
      setApiSuccess(results.data.message);
      setApiError("");
    } catch (error) {
      setApiSuccess("");
      setCounter((counter) => !counter);
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
    counter,
    setImage,
    apiError,
    apiSuccess,
    handleSubmit,
  };
};

//Admin hooks

export const useApiGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const handleDelete = async (id) => {
    try {
      const results = await delteUser(id);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user._id !== id);
        return updatedUsers;
      });

      setApiSuccess(results.data.message);
    } catch (err) {
      setApiError(err);
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

  return { users, loading, apiError, handleDelete, apiSuccess };
};
