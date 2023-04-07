import "./OpenLargeProfilePic.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPostThunk } from '../../store/posts'
import { useModal } from "../../context/Modal";


function OpenLargeProfilePic({user}) {

  const { closeModal } = useModal();

  return (
    <img src={user.profilePicUrl} alt=''></img>
  )
}


export default OpenLargeProfilePic;
