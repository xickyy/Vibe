const SET_PROFILE = 'profile/SET_PROFILE';


const setProfile = (user) => ({
  type: SET_PROFILE,
  user
})


const initialState = { profile: null };

export const getFriendThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);
  const data = await res.json();
  dispatch(setProfile(data));
  return res;
};


export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROFILE:
			return { user: action.user };
		default:
			return state;
	}
}
