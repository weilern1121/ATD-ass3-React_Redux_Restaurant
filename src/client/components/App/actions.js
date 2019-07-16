import { AppActionsConstants} from './constants.js';
import axios from 'axios';

function updateTagAction(tag) {
  return {
    type: AppActionsConstants.UPDATE_TAG,
    payload: {
      tag
    }
  }
}

function loadTagsAction(){
    return {
        type: AppActionsConstants.LOAD_TAGS,
        uri: '/api/load/tags'
    }
}

function loadTagsSuccessAction(tags){
    return {
        type: AppActionsConstants.LOAD_TAGS_SUCCESS,
        payload: {
            tags: tags
        }
    }
}

function loadTagsFailureAction(error){
    return {
        type: AppActionsConstants.LOAD_TAGS_FAILURE,
        error: error
    }
}

export const register = ({ name, location, pic }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name, location, pic });

    axios
        .post('/api/app/users', body, config)
        .then(res =>
            dispatch({
                type: AppActionsConstants.REGISTER_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            // dispatch(
            //     returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            // );
            console.log("REGISTER ERROR:" + err.response.data.msg);
            dispatch({
                type: AppActionsConstants.ERROR,
                api: 'REGISTER_FAIL',
                msg: err.response.data.msg
            });
        });
};

export const login = ({ name }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name });

    console.log("LOGIN WITH", body, name);

    axios
        .post('/api/app/login', body, config)
        .then(res =>
            dispatch({
                type: AppActionsConstants.LOGIN_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            console.log("LOGIN ERROR:" + err.response.data.msg);
            dispatch({
                type: AppActionsConstants.ERROR,
                api: 'LOGIN_FAIL',
                msg: err.response.data.msg
            });
        });
};

export const editUser = ({ oldName, name, location, pic }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ oldName, name, location, pic });
    console.log('editUser', body);

    axios
        .post('/api/app/edit_user', body, config)
        .then(res =>
            dispatch({
                type: AppActionsConstants.EDIT_USER_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            console.log("EDIT USER ERROR", err.response);
            dispatch({
                type: AppActionsConstants.ERROR,
                api: 'EDIT_USER_FAIL',
                msg: err.response.data.msg
            });
        });
};

export const search = ({ userName, restName, restLocation, score }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ userName, restName, restLocation , score});
    console.log('---------------------------------------------------------search', body);

    axios
        .post('/api/app/search', body, config)
        .then(res =>
            dispatch({
                type: AppActionsConstants.SEARCH,
                payload: res.data

            })
        )
        .catch(err => {
            console.log("SEARCH ERROR", err.response);
            dispatch({
                type: AppActionsConstants.ERROR,
                api: 'SEARCH_FAIL',
                msg: err.response.data.msg
            });
        });
};

export const clearErrors = () => {
    return {
        type: AppActionsConstants.CLEAR_ERRORS
    };
};

let AppActions  = {
    updateTagAction,
    loadTagsAction,
    loadTagsSuccessAction,
    loadTagsFailureAction
};

export default AppActions
