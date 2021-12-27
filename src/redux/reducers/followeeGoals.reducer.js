const followingGoalsReducer = (state = [], action) => {
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
export default followingGoalsReducer;
