import initialState from '../../initialState';
import {AppActionsConstants} from './constants.js';
import { List } from 'immutable';

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case AppActionsConstants.UPDATE_TAG:
            return state.set('tag', action.payload.tag);
        case AppActionsConstants.LOAD_TAGS_SUCCESS:
            let res = action.payload.tags.map(elm => {
                return {label: elm, value: elm }
            });
            return state.set('tags', new List(res));

        case AppActionsConstants.REGISTER_SUCCESS:
            return state.set('user', action.payload).set('isConnected', true).set('isLoading', false);

        case AppActionsConstants.LOGIN_SUCCESS:
            return state.set('user', action.payload).set('isConnected', true).set('isLoading', false);

        case AppActionsConstants.EDIT_USER_SUCCESS:
            console.log('EDIT_USER_SUCCESS:', action.payload);
            return state.set('user', action.payload).set('isConnected', true).set('isLoading', false);

        case AppActionsConstants.ERROR:
            let error = {
                msg: action.msg,
                type: action.api};
            return state.set('error', error);

        case AppActionsConstants.CLEAR_ERRORS:
            return state.set('error', {});
        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
