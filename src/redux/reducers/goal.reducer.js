const goalReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GOALS':
      return action.payload;
    case 'UNSET_GOALS':
      return [];
    default:
      return state;
  }
};

// goal will be on the redux state at:
// state.goal
export default goalReducer;
