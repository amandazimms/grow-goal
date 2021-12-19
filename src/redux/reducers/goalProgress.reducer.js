const goalProgressReducer = (state = 0, action) => {
  //progress for the current (selectedGoal) goal

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
