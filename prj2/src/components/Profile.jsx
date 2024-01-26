import React from "react";
import useCurrentUser from "../hooks/useCurrentUser";
export default function Profile() {
  const user = useCurrentUser();
  return (
    <div className="max-width-container">
      <div className="profile_user">
        <img
          src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
          alt=""
          className="user_image"
        />
        <div className="user-detail">
          <p>
            Name: {user.firstName} {user.lastName}
          </p>

          <p> Email:{user.email}</p>
        </div>
      </div>
    </div>
  );
}
