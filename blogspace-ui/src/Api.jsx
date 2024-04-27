import axios from "axios";

//Post apis

export const getPosts = async () => {
  const response = axios.get("http://localhost:8080/api/post");
  return response;
};

export const getPost = async (id) => {
  const response = axios.get(`http://localhost:8080/api/post/${id}`);
  return response;
};

export const getMyPosts = async () => {
  const response = axios.get("http://localhost:8080/api/posts", {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const createPost = async (data) => {
  const response = axios.post("http://localhost:8080/api/post", data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const editPost = async (id, data) => {
  const response = axios.put(`http://localhost:8080/api/post/${id}`, data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const deletePost = async (id) => {
  const response = axios.delete(`http://localhost:8080/api/post/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response;
};

//User apis

export const registerUser = async (data) => {
  const response = axios.post("http://localhost:8080/api/register", data);
  return response;
};

export const loginUser = async (data) => {
  const response = axios.post("http://localhost:8080/api/login", data);
  return response;
};
