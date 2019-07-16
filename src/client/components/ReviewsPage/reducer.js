import {ReviewActionsConstants} from './constants.js';
import initialState from "../../initialState";



export default function(state = initialState.reviewsPage, action) {
    console.log('ReviewReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    let newRevs;
    switch (action.type) {
        case ReviewActionsConstants.GET_REVIEWS:
        case ReviewActionsConstants.GET_REVIEWS_BY_REST:
        // case ReviewActionsConstants.GET_REVIEWS_BY_USER:
            return state.set('reviews', action.payload).set('loading', false);

        case ReviewActionsConstants.DELETE_REVIEW:
            newRevs = state.reviews.filter(rev => rev._id !== action.payload);
            return state.set('reviews', newRevs);
            // return {
            //     ...state,
            //     reviews: state.reviews.filter(rev => rev._id !== action.payload)
            // };
        case ReviewActionsConstants.ADD_REVIEW:
            return state.set('reviews', [action.payload, ...state.reviews]);
            // return {
            //     ...state,
            //     reviews: [action.payload, ...state.reviews]
            // };
        case ReviewActionsConstants.REVIEWS_LOADING:
            return state.set('loading', true);

            //TODO

            // case ReviewActionsConstants.EDIT_REVIEW:
            // return state.set('loading', true);

            default:
            return state;
    }
}