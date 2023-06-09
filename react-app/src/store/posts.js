const CREATE_POST = 'posts/CREATE_POST';
const GET_POSTS = 'posts/GET_POSTS';
const DELETE_POST = 'posts/DELETE_POST';
const EDIT_POST = 'posts/EDIT_POST';
const CLEAR_POSTS = 'posts/CLEAR_POSTS';


const createPost = (post) => ({
  type: CREATE_POST,
  post
})

const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
})

const deletePost = (postId) => ({
  type: DELETE_POST,
  postId
})

const editPost = (post) => ({
    type: EDIT_POST,
    post,
});

const clearPosts = () => ({
  type: CLEAR_POSTS
});


const initialState = {}

export const createPostThunk = (payload) => async (dispatch) => {
  const res = await fetch("/api/posts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      payload
    )
  });

  if (res.ok) {
    const post = await res.json()
    dispatch(createPost(post));
    return post
  }
};

export const allPostsThunk = () => async (dispatch) => {
  const res = await fetch("/api/posts/");
  const data = await res.json();
  dispatch(getPosts(data));
  return res;
};

export const deletePostThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deletePost(id));
  }
}

export const editPostThunk = (post) => async (dispatch) => {
  const res = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const editedPost = await res.json();
    dispatch(editPost(editedPost));
    return editedPost;
  }
};

export const clearPostsThunk = () => async (dispatch) => {
  dispatch(clearPosts())
}


export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_POST:
      newState[action.post.id] = action.post
      return newState;
    case GET_POSTS:
      action.posts.forEach((post) => {
        newState[post.id] = post
      });
      return newState
    case DELETE_POST:
      delete newState[action.postId]
      return newState
      case EDIT_POST:
        newState[action.post.id] = action.post;
        return newState;
      case CLEAR_POSTS:
        newState = {}
        return newState;
    default:
      return state;
  }
}
