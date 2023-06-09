import "./EditPost.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPostThunk } from '../../store/posts'
import { useModal } from "../../context/Modal";


function EditPost({ post }) {

  const dispatch = useDispatch();

  const [body, setBody] = useState(post.body);
  const [mood, setMood] = useState(post.mood);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  let userState = useSelector((state) => state.session);
  let userId = userState.user.id;

  const moods = ['None', 'Excited!', 'Sad...', 'CoNfUsEd??', 'Whatever', 'Bored', 'MAD!!!', 'In Loveee', 'Annoyed', 'Sleepy', 'Exhausted', 'Anxious', 'Pressed']

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: post.id,
      body,
      mood
    }
    if (userId) {
      const data = await dispatch(editPostThunk(payload));
      setBody('');
      setMood('None')
      closeModal();
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
    <div className="edit-post-container">
      <h3 className="edit-post-text">Edit Your Post!</h3>
      <form className="edit-post-inputs-container" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="edit-posts-spacing-on-inputs">
          Body:
          <textarea
          className="edit-post-text-area"
            type="text"
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label className="edit-posts-spacing-on-inputs">
          Mood:
          <select className="edit-post-select-input" value={mood} onChange={e => setMood(e.target.value)}>
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
        <button className="edit-post-button" type="submit">Post!</button>
      </form>
    </div>
  );
}

export default EditPost;
