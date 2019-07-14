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

        case AppActionsConstants.GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };

        case AppActionsConstants.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isConnected: true,
                isLoading: false
            };
        case AppActionsConstants.REGISTER_FAIL:
            return {
                ...state,
                user: null,
                isConnected: false,
                isLoading: false
            };
        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
