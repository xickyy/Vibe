const CREATE_POST = 'posts/CREATE_POST';
const GET_POSTS = 'posts/GET_POSTS';


const createPost = (post) => ({
  type: CREATE_POST,
  post
})

const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
})


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
  console.log('THUNKKKKK',data)
  dispatch(getPosts(data));
  return res;
};


export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_POST:
      newState[action.post.id] = action.post
      return newState;
    default:
      return state;
  }
}
