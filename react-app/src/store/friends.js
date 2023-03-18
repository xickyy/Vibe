const ADD_FRIEND = 'profile/ADD_FRIEND';


const addFriend = (user) => ({
  type: ADD_FRIEND,
  user
})


const initialState = { friends: null };


export const addFriendThunk = ( ids ) => async (dispatch) => {
  const res = await fetch("/api/users/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids)
  });

  if (res.ok){
      const friend = await res.json()
      dispatch(addFriend(friend));
      return friend
  }
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_FRIEND:
			return { user: action.user };
		default:
			return state;
	}
}
