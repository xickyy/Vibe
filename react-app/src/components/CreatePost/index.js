import "./CreatePost.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from '../../store/posts'


function CreatePost() {

  const dispatch = useDispatch();

  const [body, setBody] = useState('');
  const [mood, setMood] = useState('None');
  const [errors, setErrors] = useState([]);

  let userState = useSelector((state) => state.session);
  let userId = userState.user.id;

  const moods = ['None', 'Excited!', 'Sad...', 'CoNfUsEd??', 'Whatever', 'Bored', 'MAD!!!', 'In Loveee', 'Annoyed', 'Sleepy', 'Exhausted', 'Anxious', 'Pressed']

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      body,
      mood
    }
    if (userId) {
      const data = await dispatch(createPostThunk(payload));
      setBody('');
      setMood('None')
      if (data && data.id) {
        return
      }
    } else {
      setErrors([
        "Something went wrong",
      ]);
    }
  };

  return (
    <div className="create-post-container">
      <h3 className="create-post-header">Create a Post!</h3>
      <form className="create-post-body-mood-container" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="create-post-body">
          Body:
          <textarea
            type="text"
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label className="create-post-mood">
          Mood:
          <select value={mood} onChange={e => setMood(e.target.value)}>
            <option disabled>{'How are you feeling?'}</option>
            {moods.map(mood => (
              <option
                key={mood}
                value={mood}
              >
                {mood}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Post!</button>
      </form>
    </div>
  );
}

export default CreatePost;
