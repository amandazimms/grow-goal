const goalProgressReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_GOAL_PROGRESS':
      return action.payload;   
    default:
      return state;
  }
};

// goal will be on the redux state at:
// state.goal
export default goalProgressReducer;
