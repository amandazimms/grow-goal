import { combineReducers } from 'redux';

const profileAvatarHats = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATAR_HATS':
      return action.payload;
    default:
      return state;
  }
};

const profileAvatarEyes = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATAR_EYES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  profileAvatarHats,
  profileAvatarEyes,
});