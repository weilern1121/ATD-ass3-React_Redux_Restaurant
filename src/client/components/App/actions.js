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
    // console.log("HIIIIIIIIIIIIIIIIIIIIIIIII");
    // return dispatch({type:AppActionsConstants.REGISTER});
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name, location, pic });

    axios
        .post('/api/users', body, config)
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
            console.log("REGISTER ERROR:" + err.message);
            dispatch({
                type: AppActionsConstants.REGISTER_FAIL
            });
        });
};

export const returnErrors = (msg, status, id = null) => {
    return {
        type: AppActionsConstants.GET_ERRORS,
        payload: { msg, status, id }
    };
};

let AppActions  = {
    updateTagAction,
    loadTagsAction,
    loadTagsSuccessAction,
    loadTagsFailureAction
};

export default AppActions
