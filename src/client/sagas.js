import { all } from 'redux-saga/effects'
import AppSaga from './components/App/saga'
import ReviewsSaga from "./components/ReviewsPage/saga";
import ReviewSaga from "./components/Review/saga";

export default function* Sagas() {
    yield all([
        AppSaga(),
        ReviewSaga(),
        ReviewsSaga()

    ])
}
