import {ReviewActionsConstants} from './constants.js';
import initialState from "../../initialState";
import {AppActionsConstants} from "../App/constants";



export default function(state = initialState.reviewsPage, action) {
    console.log('ReviewReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    let newRevs;
    switch (action.type) {
        case ReviewActionsConstants.GET_REVIEWS_BY_REST:
            return state.set('reviews', action.payload).set('loading', false);

        default:
            return state;
    }
}