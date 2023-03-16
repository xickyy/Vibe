import "./UserProfilePage.css";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditUserModal from '../EditUserModal'

const UserProfilePage = () => {
  const [currentUser, setUser] = useState([]);

  let userState = useSelector((state) => state.session);
  let userId = userState.user.id;

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch(`/api/users/${userId}`);
      const user = await userResponse.json();
      setUser(user);
    };
    fetchData();
  }, []);

  const editUser = () => {
    return (
      <OpenModalButton
        buttonText="Edit Your Profile"
        modalComponent={<EditUserModal user={userState.user} />}
      />
    );
  }

  return (
    <div>
      user Page-
      {currentUser.username}
      {editUser()}
    </div>
  )
}

export default UserProfilePage
