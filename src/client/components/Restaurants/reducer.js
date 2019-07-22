import {RestActionsConstants} from './constants.js';
import initialState from '../../initialState'
import {AppActionsConstants} from "../App/constants";



export default function(state = initialState.rests, action) {
    console.log('RestReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    let newRests;
    switch (action.type.slice(0, -1)) {
        case RestActionsConstants.SEARCH:
            return state.set('restaurants', action.payload);

        case AppActionsConstants.DELETE_REVIEW:
        case AppActionsConstants.EDIT_REVIEW:
        case AppActionsConstants.WRITE_REVIEW:
            newRests = state.get('restaurants').map(rest =>
            {
                if(rest.name === action.payload.name && rest.location === action.payload.location)
                    return action.payload;
                else
                    return rest;
            });
            return state.set('restaurants', newRests);

        default:
            return state;
    }
}