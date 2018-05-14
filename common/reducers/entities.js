import * as allTypes from '../actions/actionTypes';
import { combineReducers } from 'redux';
const initial = {};

export const selectQueryDataFromUser = (state) => state.entities.user

const user = (state=initial, action) => {
  switch (action.type) {
    case allTypes.QUERYUSERINFO_REQ:
      return state
    case allTypes.QUERYUSERINFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case allTypes.QUERYUSERINFO_FAILURE:
      return state
    case allTypes.QUERYHOMEINFO_REQ:
      return state
    case allTypes.QUERYHOMEINFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case allTypes.QUERYHOMEINFO_FAILURE:
      return state
    default:
      return state
  }
};

// 合并reducers
export default combineReducers({
  user,
});
