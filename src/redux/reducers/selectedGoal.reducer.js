const selectedGoalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_GOAL':
      return action.payload;
    case 'UNSET_SELECTED_GOAL':
      return {};
    case 'SET_SELECTED_GOAL_IMAGE':
      return {...state, ...action.payload};
    case 'SET_SELECTED_GOAL_PROGRESS_ACCOMPLISHED':
      return {...state, ...action.payload}; 
    case 'SET_SELECTED_GOAL_TITLE':
      return {...state, ...action.payload};
    case 'SET_SELECTED_GOAL_VISIBILITY':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

// selectedGoal will be on the redux state at:
// state.selectedGoal
export default selectedGoalReducer;
