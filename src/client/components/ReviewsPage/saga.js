import {ReviewActionsConstants} from './constants'
import { call, put, takeEvery , takeLatest} from 'redux-saga/effects'
import {success} from './actions'


function* renderToReducer(action){
    console.log('ReviewSSSaga=', action);
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

function* ReviewsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeLatest(ReviewActionsConstants.GET_REVIEWS_BY_REST, renderToReducer);
    yield takeLatest(ReviewActionsConstants.GET_REVIEWS_BY_USER, renderToReducer);
}
export default ReviewsSaga;
