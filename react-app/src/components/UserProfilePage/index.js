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

  const ifNoBackground = () => {
    if (((isLoaded && (currentUser.profileBackgroundImgUrl === '')) || (isLoaded && !currentUser.booleans.backgroundB))) {
      return { marginTop: '15px' }
    } else {
      return { marginTop: '70px' }
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
    } else {
      return (
        <div className="user-profile-motto"></div>
      )
    }
  }

  const ifRelationship = () => {
    if ((isLoaded && currentUser.booleans.relationshipB)) {
      return (
        <div className="user-profile-detail">Relationship: {currentUser.relationshipStatus}</div>
      )
    }
  }

  const ifBirthday = () => {
    if ((isLoaded && (currentUser.birthday !== '')) && (currentUser.booleans.birthdayB)) {
      return (
        <div className="user-profile-detail">Birthday: {currentUser.birthday}</div>
      )
    }
  }

  const ifZodiac = () => {
    if (isLoaded  && currentUser.booleans.zodiacB) {
      return (
        <div className="user-profile-detail">Zodiac: {currentUser.zodiac}</div>
      )
    }
  }

  const ifHeight = () => {
    if ((isLoaded && (currentUser.height !== '')) && (currentUser.booleans.heightB)) {
      return (
        <div className="user-profile-detail">Height: {currentUser.height}</div>
      )
    }
  }

  const ifBio = () => {
    if ((isLoaded && (currentUser.bio !== '')) && (currentUser.booleans.bioB)) {
      return (
        <div className="user-profile-bio">Bio: {currentUser.bio}</div>
      )
    }
  }

  const ifBioCss = () => {
    if ((isLoaded && (currentUser.bio !== '')) && (currentUser.booleans.bioB)) {
      return "user-bio-container"
    }
  }

  const ifDetailsCss = () => {
    if (isLoaded && (currentUser.booleans.zodiacB || currentUser.booleans.heightB || currentUser.booleans.relationshipB || currentUser.booleans.birthdayB)) {
      return "user-profile-details"
    }
  }



  return (
    <div style={ifBackground()}>
      <div style={ifNoBackground()}>
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
        <div className="user-profile-bio-and-details">
          <div className={ifDetailsCss()}>
            {ifRelationship()}
            {ifBirthday()}
            {ifZodiac()}
            {ifHeight()}
          </div>
          <div className={ifBioCss()}>
            {ifBio()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
