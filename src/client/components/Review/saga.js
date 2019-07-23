import {ReviewActionsConstants} from './constants'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {success} from './actions'
import {AppActionsConstants} from "../App/constants";


function* renderToReducer(action){
    console.log('ReviewSaga=', action);
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
        yield put(success(json, action.type));
    } catch (e) {
        console.log(e.message);
    }
}

function* ReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeLatest(ReviewActionsConstants.DELETE_REVIEW, renderToReducer);
    yield takeLatest(ReviewActionsConstants.EDIT_REVIEW, renderToReducer);
}
export default ReviewSaga;
