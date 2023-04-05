import "./FriendProfilePage.css";

import { getFriendThunk } from "../../store/profile";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, Link } from "react-router-dom";
import { addFriendThunk, deleteFriendThunk } from "../../store/friends";


const FriendProfilePage = () => {


  const [isLoaded, setIsLoaded] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const dispatch = useDispatch();
  const { friendId } = useParams();

  const friendState = useSelector(state => state.friends)
  const userState = useSelector(state => state.session)
  const profileState = useSelector(state => state.profile)

  let userId;
  if (userState.user) {
    userId = userState.user.id
  }

  let profile;
  if (profileState.user) {
    profile = profileState.user
  }

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(`/api/friends/display-friends/${friendId}`);
      const data = await response.json();
      setFriendsList(data);
    };
    dispatch(getFriendThunk(friendId)).then(getFriends())
      .then(() => setIsLoaded(true));
  }, [dispatch, friendId]);


  if (isLoaded && userId === parseInt(friendId)) {
    return <Redirect to='/current_user' />
  }

  const friendRank = 0;

  const handleAddFriend = () => {
    dispatch(addFriendThunk(userId, friendId, friendRank));
  };

  const handleDeleteFriend = () => {
    let friendTableId = Object.values(friendState).find(friend => friend.friendId === parseInt(friendId))
    dispatch(deleteFriendThunk(friendTableId.id))
  }

  const friendButton = () => {
    if (userState.user === null) {
      return
    }
    if (userState.user.id === parseInt(friendId)) {
      return
    }
    if (!Object.values(friendState).find(friend => friend.friendId === parseInt(friendId))) {
      return (
        <button className="friend-follow-button" onClick={() => handleAddFriend()}>Follow this user</button>
      )
    } else {
      return (
        <button className="friend-follow-button" onClick={() => handleDeleteFriend()}>Unfollow this user</button>
      )
    }
  }


  const ifFriends = () => {
    if (true) {
      return (
        <>
          <p style={{backgroundColor: `${profile.themeColor}`, border: '2px', borderStyle: 'solid', borderColor: `${profile.trimColor}`}} className="display-friends-intro">Check Out All My Friends!</p>
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
    if ((isLoaded && (profile.profileBackgroundImgUrl !== '')) && (profile.booleans.backgroundB)) {
      return {
        position: 'absolute',
        marginTop: '-57px',
        marginLeft: '-8px',
        zIndex: '-100',
        height: '100%',
        width: '100%',
        backgroundImage: `url(${profile.profileBackgroundImgUrl})`,
        borderColor: `${profile.trimColor}`,
        color: `${profile.textColor}`
      }
    }
  }

  const ifNoBackground = () => {
    if (((isLoaded && (profile.profileBackgroundImgUrl === '')) || (isLoaded && !profile.booleans.backgroundB))) {
      return {
        marginTop: '15px',
        borderColor: `${profile.trimColor}`,
        color: `${profile.textColor}`
      }
    } else {
      return {
        marginTop: '70px',
        borderColor: `${profile.trimColor}`,
        color: `${profile.textColor}`
      }
    }
  }

  const ifFirstName = () => {
    if ((isLoaded && (profile.firstName !== '')) && (profile.booleans.firstNameB)) {
      return (
        <div className="user-profile-first-name">{profile.firstName}</div>
      )
    }
  }

  const ifLastName = () => {
    if ((isLoaded && (profile.lastName !== '')) && (profile.booleans.lastNameB)) {
      return (
        <div className="friend-last-name">{profile.lastName}</div>
      )
    }
  }

  const ifCardColors = () => {
    if ((isLoaded && (profile.cardImgUrl !== '')) && (profile.booleans.cardB)) {
      return {
        border: '2px',
        borderStyle: 'Solid',
        borderColor: `${profile.trimColor}`
      }
    }
  }

  const ifCard = () => {
    if ((isLoaded && (profile.cardImgUrl !== '')) && (profile.booleans.cardB)) {
      return (
        <img style={ifCardColors()} className="user-profile-card-img" src={profile.cardImgUrl} alt=''></img>
      )
    }
  }

  const ifMotto = () => {
    if ((isLoaded && (profile.motto !== '')) && (profile.booleans.mottoB)) {
      return (
        <div className="user-profile-motto">{profile.motto}</div>
      )
    } else {
      return (
        <div className="user-profile-motto"></div>
      )
    }
  }

  const ifRelationship = () => {
    if ((isLoaded && profile.booleans.relationshipB)) {
      return (
        <div className="user-profile-detail">Relationship: {profile.relationshipStatus}</div>
      )
    }
  }

  const ifBirthday = () => {
    if ((isLoaded && (profile.birthday !== '')) && (profile.booleans.birthdayB)) {
      return (
        <div className="user-profile-detail">Birthday: {profile.birthday}</div>
      )
    }
  }

  const ifZodiac = () => {
    if (isLoaded && profile.booleans.zodiacB) {
      return (
        <div className="user-profile-detail">Zodiac: {profile.zodiac}</div>
      )
    }
  }

  const ifHeight = () => {
    if ((isLoaded && (profile.height !== '')) && (profile.booleans.heightB)) {
      return (
        <div className="user-profile-detail">Height: {profile.height}</div>
      )
    }
  }

  const ifBio = () => {
    if ((isLoaded && (profile.bio !== '')) && (profile.booleans.bioB)) {
      return (
        <div className="user-profile-bio">Bio: {profile.bio}</div>
      )
    }
  }

  const ifBioCss = () => {
    if ((isLoaded && (profile.bio !== '')) && (profile.booleans.bioB)) {
      return "user-bio-container"
    }
  }

  const ifBioColors = () => {
    if ((isLoaded && (profile.bio !== '')) && (profile.booleans.bioB)) {
      return {
        backgroundColor: `${profile.themeColor}`,
        borderColor: `${profile.trimColor}`
      }
    }
  }

  const ifDetailsCss = () => {
    if (isLoaded && (profile.booleans.zodiacB || profile.booleans.heightB || profile.booleans.relationshipB || profile.booleans.birthdayB)) {
      return "user-profile-details"
    }
  }

  const ifDetailsColors = () => {
    if (isLoaded && (profile.booleans.zodiacB || profile.booleans.heightB || profile.booleans.relationshipB || profile.booleans.birthdayB)) {
      return {
        backgroundColor: `${profile.themeColor}`,
        borderColor: `${profile.trimColor}`
      }
    }
  }

  const profBorderColor = () => {
    if (isLoaded) {
      return {
        borderColor: `${profile.trimColor}`
      }
    }
  }





  return (isLoaded &&
    <div style={ifBackground()}>
      <div style={ifNoBackground()}>
        <div className="user-profile-header">
          <div className="user-profile-card-details">
            <div className="friend-page-username">
              {profile.username}
            </div>
            {ifMotto()}
            {ifCard()}
          </div>
          <div className="user-profile-first-last-name">
            {ifFirstName()}
            {ifLastName()}
            {friendButton()}
          </div>
          <div className="user-page-profile-pic-container">
            <img style={profBorderColor()} className="user-page-profile-pic" src={`${profile.profilePicUrl}` || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPObbT7NWyvicPB8jEGbaoMhmJ9DZNq-I2sg&usqp=CAU'} alt=''></img>
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

  // return (
  //   isLoaded &&
  //   <div style={{ position: 'absolute', marginTop: '-56px', zIndex: '-100', height: '99%', width: '99%', backgroundImage: `url(${profile.profileBackgroundImgUrl})` }}>
  //     <div style={{ marginTop: '70px' }}>
  //       <h1>friend-{profile.firstName}</h1>
  //       {friendButton()}
  //     </div>
  //   </div>
  // )

}

export default FriendProfilePage;
