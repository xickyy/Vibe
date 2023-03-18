const ADD_FRIEND = 'friends/ADD_FRIEND';
const GET_FRIENDS = 'friends/GET_FRIEND';


const addFriend = (user) => ({
  type: ADD_FRIEND,
  user
})

const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends
})


const initialState = {};


export const addFriendThunk = (userId, friendId, friendRank) => async (dispatch) => {
  const res = await fetch("/api/friends/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      friend_id: friendId,
      friend_rank: friendRank
    })
  });

  if (res.ok) {
    const friend = await res.json()
    dispatch(addFriend(friend));
    return friend
  }
};

export const allFriendsThunk = () => async (dispatch) => {
  const res = await fetch("/api/friends/");
  const data = await res.json();
  dispatch(getFriends(data));
  return res;
};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_FRIENDS:
      action.friends.friends.forEach(friend => {
        newState[friend.id] = friend
      });
      return newState;
    case ADD_FRIEND:
      newState[action.user.id] = action.user
      return newState;
    default:
      return state;
  }
}
