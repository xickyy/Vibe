import "./ShowPosts.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { allPostsThunk, deletePostThunk } from "../../store/posts";
import OpenModalButton from "../OpenModalButton";
import EditPost from "../EditPost";


const ShowPosts = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  let postsState = useSelector((state) => state.posts);
  let userState = useSelector((state) => state.session)
  let userId = userState.user.id

  useEffect(() => {
    dispatch(allPostsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let POSTS;
  let postsSorted;
  if (isLoaded) {
    POSTS = Object.values(postsState);
    postsSorted = POSTS.sort((a, b) => {
      if (a.id < b.id) {
        return 1
      }
      if (a.id > b.id) {
        return -1
      }
    })
  }

  const handleDelete = (id) => {
    dispatch(deletePostThunk(id))
  }


  const userDelete = (postId, postUserId) => {
    if (userState.user && userId === parseInt(postUserId)) {
      return (
        <button onClick={() => handleDelete(postId)}>Delete Post</button>
      )
    }
  }

  const userEdit = (post) => {
    if (userState.user && userId === parseInt(post.userId)) {
      return (
        <OpenModalButton
          buttonText="Edit Post"
          modalComponent={<EditPost post={post} />}
        />
      )
    }
  }

  return (
    <div>
      {postsSorted &&
        postsSorted.map((post) => (
          <div key={post.id} className='post-container'>
            <p>{post.user.username}</p>
            <img className="post-profile-pic" src={post.user.profilePicUrl} alt=''></img>
            <h2>{post.body}</h2>
            <p>Mood: {post.mood}</p>
            {userEdit(post)}
            {userDelete(post.id, post.userId)}
          </div>
        ))}
    </div>
  )
}

export default ShowPosts;
