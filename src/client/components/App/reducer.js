import initialState from '../../initialState';
import {AppActionsConstants} from './constants.js';
import { List } from 'immutable';
import {ReviewActionsConstants} from "../ReviewsPage/constants";

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type.slice(0, -1)){
        case AppActionsConstants.REGISTER_SUCCESS:
            let newSearch = {
                rests: state.get('search').rests,
                users: [...state.get('search').users, action.payload.name]
            };
            return state.set('user', action.payload).set('isConnected', true).set('isLoading', false).set('search', newSearch);

        case AppActionsConstants.LOGOUT:
            return state.set('user', null).set('isConnected', false).set('isLoading', false);

        case AppActionsConstants.LOGIN_SUCCESS:
            return state.set('user', action.payload).set('isConnected', true).set('isLoading', false);

        case AppActionsConstants.EDIT_USER_SUCCESS:
            return state.set('user', action.payload).set('isConnected', true).set('isLoading', false);

        case AppActionsConstants.SEARCH_USER:
            return state.set('user_search_result', action.payload);

        case AppActionsConstants.SEARCH_USER_CLEAR:
            return state.set('user_search_result', null);

        case AppActionsConstants.SEARCH_SUGGESTS:
            return state.set('search', action.payload);

        case AppActionsConstants.ERROR:
            let error = {
                msg: action.msg,
                type: action.api};
            return state.set('error', error);

        case AppActionsConstants.CLEAR_ERRORS:
            return state.set('error', {});

        case AppActionsConstants.WRITE_REVIEW:
            let newSearch2 = {
                rests: [...state.get('search').rests, action.payload.name],
                users: state.get('search').users
            };
            return state.set('search', newSearch2);

        case AppActionsConstants.DELETE_REVIEW:
        case AppActionsConstants.EDIT_REVIEW:
            let newRest = {
                name: action.payload.name,
                location: action.payload.location,
                average: action.payload.average,
                reviews: action.payload.reviews.filter(rev => rev.userName === state.get('user').name)
            };
            if(!state.get('user_reviews').get(state.get('user').name))
                return state;
            let newRests = state.get('user_reviews').get(state.get('user').name).map(rest =>
            {
                if(rest.name === action.payload.name && rest.location === action.payload.location)
                    return newRest;
                else
                    return rest;
            });
            let new_user_reviews2 = state.get('user_reviews');
            new_user_reviews2 = new_user_reviews2.set(state.get('user').name, newRests);
            return state.set('user_reviews', new_user_reviews2);

        case ReviewActionsConstants.GET_REVIEWS_BY_USER:
            let new_user_reviews = state.get('user_reviews');
            new_user_reviews = new_user_reviews.set(action.payload.userName,action.payload.reviews);
            return state.set('user_reviews', new_user_reviews);

        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
