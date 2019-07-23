import {AppActionsConstants} from './constants'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
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
        yield takeEvery(action.type, renderToReducer);
    } catch (e) {
        console.log(e.message);
    }
}

function* AppSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeLatest(AppActionsConstants.REGISTER, renderToReducer);
    yield takeLatest(AppActionsConstants.REGISTER_SUCCESS, renderToReducer);
    yield takeLatest(AppActionsConstants.LOGIN_SUCCESS, renderToReducer);
    yield takeLatest(AppActionsConstants.EDIT_USER_SUCCESS, renderToReducer);
    yield takeLatest(AppActionsConstants.SEARCH, renderToReducer);
    yield takeLatest(AppActionsConstants.SEARCH_USER, renderToReducer);
    yield takeLatest(AppActionsConstants.WRITE_REVIEW, renderToReducer);
    // yield takeEvery(AppActionsConstants.EDIT_REVIEW, renderToReducer);
    // yield takeEvery(AppActionsConstants.DELETE_REVIEW, renderToReducer);
    yield takeLatest(AppActionsConstants.SEARCH_SUGGESTS, renderToReducer);

}
export default AppSaga;
