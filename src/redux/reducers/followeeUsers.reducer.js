const followeeUsersReducer = (state = [], action) => {
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
