const plantAvatarReducer = (state = [], action) => {
  //plantAvatar is an object that should look like this: 
  //[ '/images/plantAvatars/Bush1.png', '/images/plantAvatars/Bush2.png', '/images/plantAvatars/Bush3.png'... ]
  // or same but Tulip1.png, Tulip2.png, etc. 
  // it should load all 8 of the plantAvatar growth stages for the selectedGoal

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
