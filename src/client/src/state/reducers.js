import { UPDATE_NICKNAME } from './../actions/user.js';
import { combineReducers } from 'redux';


const user = (user = { nickname: ''}, action) => {
    switch (action.type) {
        case UPDATE_NICKNAME:
            return { nickname: action.nickname }
        default:
            return user;
    }
}

export default combineReducers({ user });