import { createStore , applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { SET_CURRENT_USER, USER_LOADING } from "./actions/types";
const isEmpty = require("is-empty");


const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
  };
  
  const userSigninReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
const MyStore = createStore(userSigninReducer,composeWithDevTools(
      applyMiddleware(),));;

export default MyStore ;