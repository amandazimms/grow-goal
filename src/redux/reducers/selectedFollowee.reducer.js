const selectedFolloweeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_FOLLOWEE':
      return action.payload;
    case 'UNSET_SELECTED_FOLLOWEE':
      return {};
    default:
      return state;
  }
};

// selectedFOLLOWEE will be on the redux state at:
// state.selectedFOLLOWEE
export default selectedFolloweeReducer;
