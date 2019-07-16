import {RestActionsConstants} from './constants.js';
import initialState from '../../initialState'



export default function(state = initialState.rests, action) {
    console.log('RestReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case RestActionsConstants.GET_RESTS:
            return state.set('restaurants', action.payload).set('loading', false);

        case RestActionsConstants.DELETE_REST:
            return {
                ...state,
                restaurants: state.restaurants.filter(rest => rest._id !== action.payload)
            };
        case RestActionsConstants.ADD_REST:
            return {
                ...state,
                restaurants: [action.payload, ...state.restaurants]
            };
        case RestActionsConstants.RESTS_LOADING:
            return state.set('loading', true);

        //TODO - need to add this
        /*
    case ADD_VIEW_REST:
        return {
    };
    */
        default:
            return state;
    }
}