import { combineReducers } from 'redux';

const hats = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_HATS':
      return action.payload;
    default:
      return state;
  }
};

const hairs = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_HAIRS':
      return action.payload;
    default:
      return state;
  }
};

const eyebrows = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_EYEBROWS':
      return action.payload;
    default:
      return state;
  }
};

const eyes = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_EYES':
      return action.payload;
    default:
      return state;
  }
};

const noses = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_NOSES':
      return action.payload;
    default:
      return state;
  }
};

const details = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

const mouths = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_MOUTHS':
      return action.payload;
    default:
      return state;
  }
};

const heads = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_HEADS':
      return action.payload;
    default:
      return state;
  }
};

const bodies = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE_AVATARS_BODIES':
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  hats,
  hairs,
  eyebrows,
  eyes,
  noses,
  details,
  mouths,
  heads,
  bodies,
});