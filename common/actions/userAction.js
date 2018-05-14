import * as allTypes from './actionTypes';
import { CALL_API } from '../reduxMiddleware/fetch';

export const userInfoAction = () => ({
  [CALL_API]: {
    endpoint: '/api/user/info',
    types: [allTypes.QUERYUSERINFO_REQ, allTypes.QUERYUSERINFO_SUCCESS, allTypes.QUERYUSERINFO_FAILURE],
    method: 'get',
  }
})

export const homeInfoAction = () => ({
  [CALL_API]: {
    endpoint: '/api/home/info',
    types: [allTypes.QUERYHOMEINFO_REQ, allTypes.QUERYHOMEINFO_SUCCESS, allTypes.QUERYHOMEINFO_FAILURE],
    method: 'get',
  }
})
