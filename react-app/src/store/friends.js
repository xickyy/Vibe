// const ADD_FRIEND = 'friends/ADD_FRIEND';
const GET_FRIENDS = 'friends/ADD_FRIEND';


// const addFriend = (user) => ({
//   type: ADD_FRIEND,
//   user
// })

const getFriends = (friends) => ({
  type: GET_FRIENDS,
  friends
})


const initialState = {};


// export const addFriendThunk = (ids) => async (dispatch) => {
//   const res = await fetch("/api/friends/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(ids)
//   });

//   if (res.ok) {
//     const friend = await res.json()
//     dispatch(addFriend(friend));
//     return friend
//   }
// };

export const allFriendsThunk = () => async (dispatch) => {
  const res = await fetch("/api/friends/");
  const data = await res.json();
  dispatch(getFriends(data));
  console.log(data)
  return res;
};

export default function reducer(state = initialState, action) {
  // let newState = { ...state };
  switch (action.type) {
    case GET_FRIENDS:
      action.friends.friends.forEach(friend => {
        state[friend.id] = friend
      });
      return state;
    // case ADD_FRIEND:
    //   return { friends: action.user };
    default:
      return state;
  }
}
