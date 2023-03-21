import "./HomePage.css";

import React from "react";
import { useSelector } from "react-redux";
import CreatePost from '../CreatePost';

function HomePage () {

  let userState = useSelector((state) => state.session);

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
