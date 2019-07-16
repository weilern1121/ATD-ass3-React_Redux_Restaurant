import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import AppReducer from './components/App/reducer';
import ReviewReducer from "./components/ReviewsPage/reducer";
import RestReducer from "./components/Restaurants/reducer";


export default combineReducers({
  app: AppReducer,
  gallery: GalleryReducer,
  rests: RestReducer,
  reviewsPage: ReviewReducer
});
