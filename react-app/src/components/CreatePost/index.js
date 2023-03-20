import "./CreatePost.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function CreatePost() {

  const dispatch = useDispatch();
	const history = useHistory();

  const [body, setBody] = useState('');
  const [mood, setMood] = useState('');
  const [dateTime, setDateTime] = useState('');

  let userState = useSelector((state) => state.session);
  let userId = userState.user.id;
}

export default CreatePost;
