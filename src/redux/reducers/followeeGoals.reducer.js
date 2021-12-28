const followeeGoalsReducer = (state = [], action) => {
  //holds the goals of one of your followees
  switch (action.type) {
    case 'SET_FOLLOWEE_GOALS':
      return action.payload;
    case 'UNSET_FOLLOWEE_GOALS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default followeeGoalsReducer;
