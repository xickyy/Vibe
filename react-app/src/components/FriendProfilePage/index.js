import "./FriendProfilePage.css";

import { getFriendThunk } from "../../store/profile";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";


const FriendProfilePage = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { friendId } = useParams();

  useEffect(() => {
    dispatch(getFriendThunk(friendId))
      .then(() => setIsLoaded(true));
  }, [dispatch, friendId]);

  return (
    <h1>friend</h1>
  )

}

export default FriendProfilePage;
