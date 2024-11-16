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
  getCategoryPosts,
  getLikedPost,
  postLikePost,
  updatePost,
  getUserProfile,
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
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
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
      const results = await registerUser(formData);
      localStorage.setItem("token", results.data.token);
      localStorage.setItem("userName", results.data.userName);
      localStorage.setItem("role", results.data.role);

      setApiSuccess(results.data.message);

      navigate("/login");
    } catch (err) {
      setCounter((counter) => !counter);
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
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

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
      const results = await loginUser(formData);
      localStorage.setItem("token", results.data.token);
      localStorage.setItem("userName", results.data.userName);
      localStorage.setItem("role", results.data.role);
      localStorage.setItem("userId", results.data.userId);

      setRole(results.data.role);
      setIsLoggedIn(true);
      setApiSuccess(results.data.message);
      navigate("/");
    } catch (err) {
      setCounter((counter) => !counter);
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

export const useApiUpdateProfile = () => {
  const handleUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      const file = e.target.files[0];
      if (!file) {
        console.error("No file selected");
        return;
      }
      const formData = new FormData();
      formData.append("image", file); // Use "image" here to match the backend

      const updatedData = await updatePost(formData);
      console.log(updatedData, "this is a file");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleUpdateProfile };
};

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setUser(data);
        console.log(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, loading, error };
};

//Post hooks

export const useApiGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [searchRsults, setSearchResults] = useState([]);
  const [category, setCategory] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);

  const apiLikePost = async (postId) => {
    try {
      await postLikePost(postId);
    } catch (error) {
      throw error;
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const { data } = await getLikedPost();
      const idLikePost = data.likedPosts.map((post) => post._id);

      setLikedPosts(idLikePost);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchLikedPosts();
    }
  }, []);

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
      if (localStorage.getItem("token")) {
        fetchLikedPosts();
      }
      setPosts(data.data.posts);
      setTotalPosts(data.data.totalItems);
    } catch (error) {
      setPosts([]);
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
    }
  };

  const fetchCategoryPosts = useCallback(async () => {
    try {
      const data = await getCategoryPosts({ category });
      setPosts(data.data); // Assuming your API returns data in this format
    } catch (error) {
      setPosts([]);
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      fetchCategoryPosts();
    }
  }, [category, fetchCategoryPosts]);

  const debouncedSearchPosts = useDebouncedCallback(searchPosts, 500);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    setPage,
    totalPosts,
    page,
    searchPosts,
    searchRsults,
    debouncedSearchPosts,
    fetchCategoryPosts,
    setCategory,
    fetchLikedPosts,
    likedPosts,
    setLikedPosts,
    apiLikePost,
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
  const [category, setCategory] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [counter, setCounter] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);

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
    if (!category) {
      setCounter((counter) => !counter);
      setApiError("Please fill all the category field ⛔");
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
    setCategory,
    image,
    setImage,
    apiError,
    apiSuccess,
    handleSubmit,
    counter,
    category,
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
