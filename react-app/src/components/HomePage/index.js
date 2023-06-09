import "./HomePage.css";

import React from "react";
// import { useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from '../CreatePost';
import ShowPosts from "../ShowPosts";
import Footer from "../Footer";

function HomePage () {

  let userState = useSelector((state) => state.session);
  // const [isLoaded, setIsLoaded] = useState(false);




  if(userState.user){
    return (
      <div className="home-page-components">
      <CreatePost />
      <ShowPosts />
      <br></br>
      <Footer />
      </div>
    )
  } else {
    return (
      <>
      <h1 className="welcome-title">Welcome to VIBE!</h1>
      <h3 className="welcome-message">Sign in or make an account to start making friends and sharing your thoughts!</h3>
      </>
    )
  }
}

export default HomePage;
