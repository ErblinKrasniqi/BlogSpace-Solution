import React, { useState, useEffect } from "react";

import { getUsers, delteUser } from "../../Api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      const results = await delteUser(id);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user._id !== id);
        return updatedUsers;
      });
      console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUsersHandler = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.users);
        console.log(users);

        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    };

    getUsersHandler();
    // eslint-disable-next-line
  }, [loading]);

  return (
    <div className="container mb-5">
      <h1>Users</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="d-flex gap-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
