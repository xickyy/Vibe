import "./FriendProfilePage.css";

import { getFriendThunk } from "../../store/profile";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { addFriendThunk, allFriendsThunk} from "../../store/friends";


const FriendProfilePage = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { friendId } = useParams();

  const friendState = useSelector(state => state.friends)
  const userState = useSelector(state => state.session)
  let userId;
  if (userState.user) {
    userId = userState.user.id
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

  const friendButton = () => {
    if (userState.user === null) {
      return
    }
    if (userState.user.id === parseInt(friendId)) {
      return
    }
    if (!Object.values(friendState).find(friend => friend.friendId == friendId)) {
      return (
        <button onClick={() => handleAddFriend()}>Follow this user</button>
      )
    } else {
      return (
        <button>Unfollow this user</button>
      )
    }
  }

  return (
    <>
    <h1>friend</h1>
    {friendButton()}
    </>
  )

}

export default FriendProfilePage;
