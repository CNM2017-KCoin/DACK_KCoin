import {combineReducers} from 'redux';

const initState = {
  user: {
    email:"test@gmail.com"
  }
}

const mainReducer = (state = initState, action) => {
  switch(action.type){
    case "LOAD_USER":
      return {
        user: action.data
      }
      break;
    default:
      return state;
  }
}

export default combineReducers({mainReducer});
