const selectedGoalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_GOAL':
      console.log('setting selected goal to:', action.payload);
      return action.payload;
    case 'UNSET_SELECTED_GOAL':
      console.log('UNsetting selected! (a.p is):', action.payload);
      return {};
    default:
      return state;
  }
};

// selectedGoal will be on the redux state at:
// state.selectedGoal
export default selectedGoalReducer;
