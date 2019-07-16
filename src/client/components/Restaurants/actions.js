import axios from 'axios';
import { RestActionsConstants } from './constants';

// import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

export const getRests = () => dispatch => {
    console.log('getRests');
    dispatch(setRestsLoading());
    axios
        .get('/api/restaurants')
        .then(res =>
            dispatch({
                type: RestActionsConstants.GET_RESTS,
                payload: res.data
            })
        )
        .catch(err =>
            {console.log(err);}
                // dispatch(returnErrors(err.response.data, err.response.status))}
        );
};

export const addRest = newRest => (dispatch, getState) => {
    axios
        .post('/api/restaurants', newRest)
        // .post('/api/restaurants', newRest, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: RestActionsConstants.ADD_REST,
                payload: res.data
            })
        )
        .catch(err =>
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteRest = id => (dispatch, getState) => {
    axios
    // .delete(`/api/restaurants/${id}`, tokenConfig(getState))
        .delete(`/api/restaurants/${id}`)
        .then(res =>
            dispatch({
                type: RestActionsConstants.DELETE_REST,
                payload: id
            })
        )
        .catch(err =>
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setRestsLoading = () => {
    return {
        type: RestActionsConstants.RESTS_LOADING
    };
};
