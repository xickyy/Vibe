import "./ShowPosts.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { allPostsThunk } from "../../store/posts";


const ShowPosts = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  let postsState = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(allPostsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let POSTS;
  if (isLoaded) {
    POSTS = Object.values(postsState);
  }

  return (
    <div>
      {POSTS &&
        POSTS.map((post) => (
          <div key={post.id} className='post-container'>
            <p>{post.user.username}</p>
            <h2>{post.body}</h2>
            <p>{post.mood}</p>
          </div>
        ))}
    </div>
  )
}

export default ShowPosts;
