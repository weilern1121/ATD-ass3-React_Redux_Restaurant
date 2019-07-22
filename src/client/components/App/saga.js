import {AppActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {fail, success} from './actions'

function* renderToReducer(action){
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: action.body
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if(json.msg)
            yield put(fail(json.msg, action.api));
        else
            yield put(success(json, action.type));
    } catch (e) {
        console.log('SAGE RESPONSE2', json);
        if(action.api)
            yield put(fail(e.message, action.api));
    }
}

function* AppSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AppActionsConstants.REGISTER, renderToReducer);
    yield takeEvery(AppActionsConstants.REGISTER_SUCCESS, renderToReducer);
    yield takeEvery(AppActionsConstants.LOGIN_SUCCESS, renderToReducer);
    yield takeEvery(AppActionsConstants.EDIT_USER_SUCCESS, renderToReducer);
    yield takeEvery(AppActionsConstants.SEARCH, renderToReducer);
    yield takeEvery(AppActionsConstants.SEARCH_USER, renderToReducer);
    yield takeEvery(AppActionsConstants.WRITE_REVIEW, renderToReducer);
    yield takeEvery(AppActionsConstants.EDIT_REVIEW, renderToReducer);
    yield takeEvery(AppActionsConstants.SEARCH_SUGGESTS, renderToReducer);
    yield takeEvery(AppActionsConstants.DELETE_REVIEW, renderToReducer);
}
export default AppSaga;
