import "./HomePage.css";

import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from '../CreatePost';
import { allPostsThunk } from "../../store/posts";

function HomePage () {

  let userState = useSelector((state) => state.session);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPostsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);



  if(userState.user){
    return (
      <>
      <div>Home</div>
      <CreatePost />
      </>
    )
  } else {
    return (
      <h3>Sign in or make an account to start making friends and sharing your thoughts!</h3>
    )
  }
}

export default HomePage;
