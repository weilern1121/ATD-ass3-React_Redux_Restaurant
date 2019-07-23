import axios from 'axios';
import { ReviewActionsConstants } from './constants';
import {AppActionsConstants} from "../App/constants";


export const getReviews = ( {restName}) => {
    // Request body
    const body = JSON.stringify({restName});

    return {
        type: ReviewActionsConstants.GET_REVIEWS_BY_REST,
        body: body,
        uri:'/api/reviews/reviewsByRest',
    };
};

export const getReviewsByUser = ( {name}) => {

    // Request body
    const body = JSON.stringify({name});

    return {
        type: ReviewActionsConstants.GET_REVIEWS_BY_USER,
        body: body,
        uri:'/api/reviews/reviewsByUser',
    };
};

export const success = (payload, type) => {
    return {
        type: type +'2',
        payload: payload
    };
};



