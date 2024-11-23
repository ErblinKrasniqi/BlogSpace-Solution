import React from "react";
import { FaPlus } from "react-icons/fa";
import styles from "../../Assets/scss/profile.module.scss";
import { Form } from "react-bootstrap";
import { useApiUpdateProfile, useUserProfile } from "../../Hooks/userHooks";

const Profile = () => {
  const { handleUpdateProfile } = useApiUpdateProfile();
  const { user, loading, error } = useUserProfile();

  const profileData = {
    email: "sa.kr@gmail.com",
    name: "Erblin Krasniqi",
  };

  if (loading) {
    return <p>Loading user data...</p>; // Display a loading message or spinner
  }

  if (error) {
    return <p>Failed to load user data: {error.message}</p>; // Display an error message
  }

  if (!user) {
    return <p>No user data available.</p>; // Handle unexpected null user scenario
  }
  return (
    <div className={styles.container}>
      <div className="row justify-content-center">
        <div className="col-lg-12 col-12">
          <div className={styles.profileCard}>
            {/* Profile Picture */}
            <div className={styles.profilePicture}>
              <Form.Group>
                <Form.Control
                  type="file"
                  className={styles.fileInput}
                  onChange={(e) => handleUpdateProfile(e)}
                />
                {user.profileImage ? (
                  <img
                    src={`http://localhost:8080${user.profileImage}`}
                    className={styles.profileImage}
                  ></img>
                ) : (
                  <div className={styles.picturePlaceholder}>
                    <FaPlus size={20} />
                  </div>
                )}
              </Form.Group>
              <p className={styles.uploadText}>Add Profile Picture</p>
            </div>
            {/* User Info */}
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{user.name}</h2>
              <p className={styles.profileEmail}>{user.email}</p>
            </div>

            {/* Additional Details */}
            <div className={styles.profileActions}>
              <button className={`btn btn-primary ${styles.actionButton}`}>
                Edit Profile
              </button>
              <button className={`btn btn-secondary ${styles.actionButton}`}>
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
