const followingGoalsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FOLLOWING_GOALS':
      return action.payload;
    case 'UNSET_FOLLOWING_GOALS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default followingGoalsReducer;
