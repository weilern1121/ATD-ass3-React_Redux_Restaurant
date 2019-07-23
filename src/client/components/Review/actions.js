import { ReviewActionsConstants } from './constants';

export const deleteReview = (review) => {

    // Request body
    const body = JSON.stringify(review);

    return {
        type: ReviewActionsConstants.DELETE_REVIEW,
        body: body,
        uri:'/api/app/delete_review',
    };
};

export const editReview = (review) => {

    // Request body
    const body = JSON.stringify(review);

    return {
        type: ReviewActionsConstants.EDIT_REVIEW,
        body: body,
        uri:'/api/app/edit_review'
    };
};

export const success = (payload, type) => {
    return {
        type: type +'2',
        payload: payload
    };
};



