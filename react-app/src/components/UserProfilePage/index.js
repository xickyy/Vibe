import "./UserProfilePage.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const [currentUser, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [friendsList, setFriendsList] = useState([]);

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
    const getFriends = async () => {
      const response = await fetch('/api/friends/display-friends');
      const data = await response.json();
      setFriendsList(data);
    };
    fetchData().then(getFriends()).then(() => setIsLoaded(true));
  }, [userId]);

  const ifFriends = () => {
    if (true) {
      return (
        <>
          <p style={{backgroundColor: `${currentUser.themeColor}`, border: '2px', borderStyle: 'solid', borderColor: `${currentUser.trimColor}`}} className="display-friends-intro">Check Out All Your Friends!</p>
          <div className="display-friends-container">
            {friendsList &&
              friendsList.map((friend) => (
                <div style={{borderColor: `${friend.trimColor}`}} className="friend-card-container" key={friend.id}>
                  <div style={{ color: `${friend.textColor}` }} className="display-friends-username-and-motto">
                    <p className="friend-list-display-username">
                      {friend.username}
                    </p>
                    <p className="friend-list-display-motto">
                      {friend.motto}
                    </p>
                  </div>
                  <Link to={`/users/${friend.id}`}>
                    <img style={{borderColor: `${friend.trimColor}`}} className="friend-list-profile-img" src={friend.profilePicUrl}></img>
                  </Link>
                    <img className="friend-list-card-img" src={friend.cardImgUrl}></img>
                </div>
              ))}
          </div>
        </>
      )
    }
  }

  const ifBackground = () => {
    if ((isLoaded && (currentUser.profileBackgroundImgUrl !== '')) && (currentUser.booleans.backgroundB)) {
      return {
        position: 'absolute',
        marginTop: '-57px',
        marginLeft: '-8px',
        zIndex: '-100',
        height: '100%',
        width: '100%',
        backgroundImage: `url(${currentUser.profileBackgroundImgUrl})`,
        borderColor: `${currentUser.trimColor}`,
        color: `${currentUser.textColor}`
      }
    }
  }

  const ifNoBackground = () => {
    if (((isLoaded && (currentUser.profileBackgroundImgUrl === '')) || (isLoaded && !currentUser.booleans.backgroundB))) {
      return {
        marginTop: '15px',
        borderColor: `${currentUser.trimColor}`,
        color: `${currentUser.textColor}`
      }
    } else {
      return {
        marginTop: '70px',
        borderColor: `${currentUser.trimColor}`,
        color: `${currentUser.textColor}`
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

  const ifCardColors = () => {
    if ((isLoaded && (currentUser.cardImgUrl !== '')) && (currentUser.booleans.cardB)) {
      return {
        border: '2px',
        borderStyle: 'Solid',
        borderColor: `${currentUser.trimColor}`
      }
    }
  }

  const ifCard = () => {
    if ((isLoaded && (currentUser.cardImgUrl !== '')) && (currentUser.booleans.cardB)) {
      return (
        <img style={ifCardColors()} className="user-profile-card-img" src={currentUser.cardImgUrl} alt=''></img>
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
    if (isLoaded && currentUser.booleans.zodiacB) {
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

  const ifBioColors = () => {
    if ((isLoaded && (currentUser.bio !== '')) && (currentUser.booleans.bioB)) {
      return {
        backgroundColor: `${currentUser.themeColor}`,
        borderColor: `${currentUser.trimColor}`
      }
    }
  }

  const ifDetailsCss = () => {
    if (isLoaded && (currentUser.booleans.zodiacB || currentUser.booleans.heightB || currentUser.booleans.relationshipB || currentUser.booleans.birthdayB)) {
      return "user-profile-details"
    }
  }

  const ifDetailsColors = () => {
    if (isLoaded && (currentUser.booleans.zodiacB || currentUser.booleans.heightB || currentUser.booleans.relationshipB || currentUser.booleans.birthdayB)) {
      return {
        backgroundColor: `${currentUser.themeColor}`,
        borderColor: `${currentUser.trimColor}`

      }
    }
  }

  const profBorderColor = () => {
    if (isLoaded) {
      return {
        borderColor: `${currentUser.trimColor}`
      }
    }
  }




  return (
    <div style={ifBackground()}>
      <div style={ifNoBackground()}>
        <div className="user-profile-header">
          <div className="user-profile-card-details">
            <div className="user-profile-firstName">
              {currentUser.username}
            </div>
            {ifMotto()}
            {ifCard()}
          </div>
          <div className="user-profile-first-last-name">
            {ifFirstName()}
            {ifLastName()}
          </div>
          <div className="user-page-profile-pic-container">
            <img style={profBorderColor()} className="user-page-profile-pic" src={`${currentUser.profilePicUrl}` || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPObbT7NWyvicPB8jEGbaoMhmJ9DZNq-I2sg&usqp=CAU'} alt=''></img>
          </div>
        </div>
        <div className="user-profile-bio-and-details">
          <div style={ifDetailsColors()} className={ifDetailsCss()}>
            {ifRelationship()}
            {ifBirthday()}
            {ifZodiac()}
            {ifHeight()}
          </div>
          <div style={ifBioColors()} className={ifBioCss()}>
            {ifBio()}
          </div>
        </div>
        <div>
          {ifFriends()}
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
