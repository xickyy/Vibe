const SET_FRIEND = 'profile/SET_FRIEND';


const setFriend = (user) => ({
  type: SET_FRIEND,
  user
})


const initialState = { profile: null };

export const getFriendThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);
  const data = await res.json();
  dispatch(setFriend(data));
  return res;
};


export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_FRIEND:
			return { user: action.user };
		default:
			return state;
	}
}
