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
        <button onClick={() => handleAddFriend()}>Follow this user</button>
      )
    } else {
      return (
        <button onClick={() => handleDeleteFriend()}>Unfollow this user</button>
      )
    }
  }

  return (
    isLoaded &&
    <div style={{ position: 'absolute', marginTop: '-56px', zIndex: '-100', height: '99%', width: '99%', backgroundImage: `url(${profile.profileBackgroundImgUrl})` }}>
      <div style={{ marginTop: '70px' }}>
        <h1>friend-{profile.firstName}</h1>
        {friendButton()}
      </div>
    </div>
  )

}

export default FriendProfilePage;
