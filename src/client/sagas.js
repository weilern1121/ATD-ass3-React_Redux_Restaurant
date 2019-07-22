import { all } from 'redux-saga/effects'
import AppSaga from './components/App/saga'
import ReviewSaga from "./components/ReviewsPage/saga";

export default function* Sagas() {
    yield all([
        AppSaga(),
        ReviewSaga()
    ])
}
