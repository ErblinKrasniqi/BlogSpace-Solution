import axios from "axios";

//Post apis

export const getPosts = async (page) => {
  const response = axios.get(`http://localhost:8080/api/post?page=${page}`);
  return response;
};

export const getCategoryPosts = async (data) => {
  const respons = axios.post(`http://localhost:8080/api/posts/category`, data);
  console.log(data);
  return respons;
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

export const searchPost = async (query) => {
  const response = axios.get(
    `http://localhost:8080/api/search?search=${query}`
  );
  return response;
};

export const updatePost = async (data) => {
  const response = axios.post("http://localhost:8080/api/user/profile", data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/user/${localStorage.getItem("userId")}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

//Likes api

export const getLikedPost = async () => {
  const response = axios.get(
    `http://localhost:8080/api/users/${localStorage.getItem(
      "name"
    )}/likedPosts`,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return response;
};

export const postLikePost = async (postId) => {
  const response = axios.post(
    `http://localhost:8080/api/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );

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

export const getUsers = async () => {
  const response = axios.get("http://localhost:8080/api/users", {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const delteUser = async (id) => {
  const response = axios.delete(`http://localhost:8080/api/user/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  return response;
};

//comment apis

export const createComment = async (data) => {
  const response = axios.post("http://localhost:8080/api/comment", data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export const deleteComment = async (id) => {
  const response = axios.delete(`http://localhost:8080/api/comment/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return response;
};
