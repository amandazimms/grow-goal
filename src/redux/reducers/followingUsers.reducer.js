const followingUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FOLLOWING_USERS':
      return action.payload;
    case 'UNSET_FOLLOWING_USERS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default followingUsersReducer;
