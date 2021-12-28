const followeeUsersReducer = (state = [], action) => {
  //holds the users that you follow
  switch (action.type) {
    case 'SET_FOLLOWEE_USERS':
      return action.payload;
    case 'UNSET_FOLLOWEE_USERS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default followeeUsersReducer;
