import "./FriendProfilePage.css";

import { getFriendThunk } from "../../store/profile";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, Link } from "react-router-dom";
import { addFriendThunk, deleteFriendThunk } from "../../store/friends";
import OpenLargeProfilePic from "../OpenLargeProfilePic";
import OpenModalButton from "../OpenModalButton";


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
    if(profile && profile.friends.length === 0) {
      return
    }

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
                    <img style={{borderColor: `${friend.trimColor}`}} className="friend-list-profile-img" src={friend.profilePicUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPObbT7NWyvicPB8jEGbaoMhmJ9DZNq-I2sg&usqp=CAU'} alt=''></img>
                  </Link>
                    <img className="friend-list-card-img" src={friend.cardImgUrl || 'data:image/jpeg;base64,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'} alt=''></img>
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
          < OpenModalButton modalComponent={<OpenLargeProfilePic user={profile} />} />
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
