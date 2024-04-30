import { useApiGetUsers } from "../../Hooks/userHooks";
import Message from "../../components/Message";

const Users = () => {
  const { users, loading, handleDelete, apiSuccess, apiError } =
    useApiGetUsers();

  return (
    <div className="container d-flex flex-column align-items-center mb-5 vh-100">
      {apiSuccess || apiError ? (
        <Message
          message={apiSuccess ? apiSuccess : apiError}
          type={apiSuccess ? "success" : "danger"}
        />
      ) : null}

      <h1 className="my-5">Users</h1>
      <div className="col-10">
        <table className=" table">
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
    </div>
  );
};

export default Users;
