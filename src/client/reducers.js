import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';
import ReviewReducer from "./components/ReviewsPage/reducer";
import RestReducer from "./components/Restaurants/reducer";


export default combineReducers({
  app: AppReducer,
  rests: RestReducer,
  reviewsPage: ReviewReducer
});
