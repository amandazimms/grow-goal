const plantAvatarReducer = (state = '', action) => {
  //holds the ONE plant avatar image url for the current growth stage only
  
  switch (action.type) {
    case 'SET_PLANT_AVATAR':
      return action.payload;
    case 'UNSET_PLANT_AVATAR':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default plantAvatarReducer;
