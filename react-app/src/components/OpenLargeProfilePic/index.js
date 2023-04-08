import "./OpenLargeProfilePic.css";

import React from "react";


function OpenLargeProfilePic({user}) {


  return (
    <img src={user.profilePicUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPObbT7NWyvicPB8jEGbaoMhmJ9DZNq-I2sg&usqp=CAU'} alt=''></img>
  )
}


export default OpenLargeProfilePic;
