import {ReviewActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {success} from './actions'

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
        console.alert(e.message);
    }
}

function* ReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ReviewActionsConstants.GET_REVIEWS_BY_REST, renderToReducer);
    yield takeEvery(ReviewActionsConstants.GET_REVIEWS_BY_USER, renderToReducer);
}
export default ReviewSaga;
