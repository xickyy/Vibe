import "./UserProfilePage.css";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const [currentUser, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
    fetchData().then(() => setIsLoaded(true));
  }, [userId]);


  const ifBackground = () => {
    if ((isLoaded && (currentUser.profileBackgroundImgUrl !== '')) && (currentUser.booleans.backgroundB)) {
      return {
        position: 'absolute',
        marginTop: '-57px',
        marginLeft: '-8px',
        zIndex: '-100',
        height: '100%',
        width: '100%',
        backgroundImage: `url(${currentUser.profileBackgroundImgUrl})`
      }
    }
  }

  const ifFirstName = () => {
    if ((isLoaded && (currentUser.firstName !== '')) && (currentUser.booleans.firstNameB)) {
      return (
        <div className="user-profile-first-name">{currentUser.firstName}</div>
      )
    }
  }

  const ifLastName = () => {
    if ((isLoaded && (currentUser.lastName !== '')) && (currentUser.booleans.lastNameB)) {
      return (
        <div>{currentUser.lastName}</div>
      )
    }
  }

  const ifCard = () => {
    if ((isLoaded && (currentUser.cardImgUrl !== '')) && (currentUser.booleans.cardB)) {
      return (
        <img className="user-profile-card-img" src={currentUser.cardImgUrl} alt=''></img>
      )
    }
  }

  const ifMotto = () => {
    if ((isLoaded && (currentUser.motto !== '')) && (currentUser.booleans.mottoB)) {
      return (
        <div className="user-profile-motto">{currentUser.motto}</div>
      )
    }
  }


  return (
    <div style={ifBackground()}>
      <div style={{ marginTop: '70px' }}>
        <div className="user-profile-header">
          <div className="user-profile-card-details">
            {currentUser.username}
            {ifMotto()}
            {ifCard()}
          </div>
          <div className="user-profile-first-last-name">
            {ifFirstName()}
            {ifLastName()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
