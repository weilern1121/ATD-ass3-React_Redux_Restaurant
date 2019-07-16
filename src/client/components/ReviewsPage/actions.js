import axios from 'axios';
import { ReviewActionsConstants } from './constants';

// import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

export const getReviews = ( {restName}) => dispatch => {
    console.log('getReviews');
    dispatch(setReviewsLoading());


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({restName});

    console.log('body',body);
    console.log('restName',restName);

    axios
        .post('/api/reviews/reviewsByRest', body , config)
        .then(res =>
            dispatch({
                type: ReviewActionsConstants.GET_REVIEWS_BY_REST,
                payload: res.data
            })
        )
        .catch(err =>
            {console.log(err);}
            // dispatch(returnErrors(err.response.data, err.response.status))}
        );
};

export const addReview = ({ userName, restName, restLocation, bathroomRate, cleanRate, staffRate,
                              driveRate, deliveryRate, foodRate, pic, date}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({
        userName, restName, restLocation, bathroomRate, cleanRate, staffRate
        , driveRate, deliveryRate, foodRate, pic, date
    });

    axios
        .post('/api/reviewPage', body, config)
        .then(res =>
            dispatch({
                type: ReviewActionsConstants.ADD_REVIEW,
                payload: res.data
            })
        )
        .catch(err =>
                console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteReview = ({ _id}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({_id});

    axios
    // .delete(`/api/restaurants/${id}`, tokenConfig(getState))
        .delete(`/api/reviewPage/${id}`, body)
        .then(res =>
            dispatch({
                type: ReviewActionsConstants.DELETE_REVIEW,
                payload: id
            })
        )
        .catch(err =>
                console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setReviewsLoading = () => {
    return {
        type: ReviewActionsConstants.REVIEWS_LOADING
    };
};

export const setSortType = (newType) => dispatch =>{
    return {
        type: ReviewActionsConstants.EDIT_SORT_TYPE,
        payload: newType
    };
};


