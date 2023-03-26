import "./UserProfilePage.css";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const [currentUser, setUser] = useState([]);

  let userState = useSelector((state) => state.session);
  let userId;
  if (userState.user) {
    userId = userState.user.id;
  }

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch(`/api/users/${userId}`);
      const user = await userResponse.json();
      setUser(user);
    };
    fetchData();
  }, [userId]);


  return (
    <div style={{position: 'absolute', marginTop:'-56px', zIndex:'-100', height:'99%', width:'99%', backgroundImage: `url(${currentUser.profileBackgroundImgUrl})`}}>
      <div style={{marginTop:'70px'}}>
      user Page-
      {currentUser.username}
      </div>
    </div>
  )
}

export default UserProfilePage
