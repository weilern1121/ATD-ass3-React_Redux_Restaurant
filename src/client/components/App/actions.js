import { AppActionsConstants} from './constants.js';
import axios from 'axios';


export const register = ({ name, location, pic }) => {

    // Request body
    const body = JSON.stringify({ name, location, pic});

    return {
        type: AppActionsConstants.REGISTER_SUCCESS,
        body: body,
        api: 'REGISTER_FAIL',
        uri:'/api/app/users'
    };
};

export const writeReview = (review) =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    // Request body
    const body = JSON.stringify(review);

    return {
        type: AppActionsConstants.WRITE_REVIEW,
        body: body,
        api: 'WRITE_REVIEW_FAIL',
        uri:'/api/app/write_review'
    };

};

export const editReview = (review) => {

    // Request body
    const body = JSON.stringify(review);

    return {
        type: AppActionsConstants.EDIT_REVIEW,
        body: body,
        uri:'/api/app/edit_review'
    };
};

export const login = ({ name }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name });

    return {
        type: AppActionsConstants.LOGIN_SUCCESS,
        body: body,
        uri:'/api/app/login',
        api: 'LOGIN_FAIL'
    };
};

export const logOut = () => {
    return{
        type: AppActionsConstants.LOGOUT + '2'
    };
};

export const editUser = ({ oldName, name, location, pic }) =>{

    // Request body
    const body = JSON.stringify({ oldName, name, location, pic });

    return {
        type: AppActionsConstants.EDIT_USER_SUCCESS,
        body: body,
        uri:'/api/app/edit_user',
        api: 'EDIT_USER_FAIL'
    };
};

export const search = ({ userName, restName, restLocation, score, userLocation, sort }) => {

    if (!userLocation)
        userLocation ='';
    // Request body
    const body = JSON.stringify({ userName, restName, restLocation , score, userLocation, sort});

    console.log("SEARCHHHHHH:", body);

    return {
        type: AppActionsConstants.SEARCH,
        body: body,
        uri:'/api/app/searchRests',
    };
};

export const searchUser = ({ name, location }) => {

    // Request body
    const body = JSON.stringify({ name, location });

    return {
        type: AppActionsConstants.SEARCH_USER,
        body: body,
        uri:'/api/app/searchUsers',
    };
};

export const clearErrors = () => {
    return {
        type: AppActionsConstants.CLEAR_ERRORS + '2'
    };
};

export const searchUserClear = () => {
    return {
        type: AppActionsConstants.SEARCH_USER_CLEAR + '2',
    };
};

export const getSearchSuggests = (body)  => {


    return {
        type: AppActionsConstants.SEARCH_SUGGESTS,
        body: JSON.stringify({}),
        uri:'/api/app/getSearchSuggests',
    };
};

export const deleteReview = (review) => {

    // Request body
    const body = JSON.stringify(review);

    return {
        type: AppActionsConstants.DELETE_REVIEW,
        body: body,
        uri:'/api/app/delete_review',
    };
};

export const success = (payload, type) => {
    return {
        type: type +'2',
        payload: payload
    };
};

export const fail = (msg, api) => {
    return {
        type: AppActionsConstants.ERROR + '2',
        api: api,
        msg: msg
    };
};
