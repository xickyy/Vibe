const CREATE_POST = 'posts/CREATE_POST';


const createPost = (post) => ({
  type: CREATE_POST,
  post
})


const initialState = {}

export const createPostThunk = (userId, body, mood, dateTime) => async (dispatch) => {
  const res = await fetch("/api/posts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      body: body,
      mood: mood,
      date: dateTime
    })
  });

  if (res.ok) {
    const post = await res.json()
    dispatch(createPost(post));
    return post
  }
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
