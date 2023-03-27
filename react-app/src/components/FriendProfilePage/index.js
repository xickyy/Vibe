import "./FriendProfilePage.css";

import { getFriendThunk } from "../../store/profile";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { addFriendThunk, deleteFriendThunk } from "../../store/friends";


const FriendProfilePage = () => {


  const [isLoaded, setIsLoaded] = useState(false);
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
    dispatch(getFriendThunk(friendId))
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

  const ifCard = () => {
    if ((isLoaded && (profile.cardImgUrl !== '')) && (profile.booleans.cardB)) {
      return (
        <img className="user-profile-card-img" src={profile.cardImgUrl} alt=''></img>
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
    if (isLoaded  && profile.booleans.zodiacB) {
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
        backgroundColor: `${profile.themeColor}`
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
        backgroundColor: `${profile.themeColor}`
      }
    }
  }





  return ( isLoaded &&
    <div style={ifBackground()}>
      <div style={ifNoBackground()}>
        <div className="user-profile-header">
          <div className="user-profile-card-details">
            {profile.username}
            {ifMotto()}
            {ifCard()}
          </div>
          <div className="user-profile-first-last-name">
            {ifFirstName()}
            {ifLastName()}
            {friendButton()}
          </div>
          <div className="user-page-profile-pic-container">
            <img className="user-page-profile-pic" src={`${profile.profilePicUrl}` || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPObbT7NWyvicPB8jEGbaoMhmJ9DZNq-I2sg&usqp=CAU'} alt=''></img>
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
