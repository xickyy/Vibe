import "./HomePage.css";

import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from '../CreatePost';
import ShowPosts from "../ShowPosts";

function HomePage () {

  let userState = useSelector((state) => state.session);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();




  if(userState.user){
    return (
      <>
      <div>Home</div>
      <CreatePost />
      <ShowPosts />
      </>
    )
  } else {
    return (
      <h3>Sign in or make an account to start making friends and sharing your thoughts!</h3>
    )
  }
}

export default HomePage;
