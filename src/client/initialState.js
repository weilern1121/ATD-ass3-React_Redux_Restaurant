const { Map } = require('immutable');

export default {
    app: Map({
      isConnected: false,
      isLoading: false,
      user: null,
      error: {},
      user_search_result: null,
      search:{rests:[], users:[]},
      user_reviews : Map({})
    }),
    search: Map({
       results: []
    }),
    error: Map({
        msg: null,
        type: null
    }),
    rests: Map({
        restaurants: [],
        loading: false,

    }),
    reviewsPage: Map({
        reviews: [],
        loading: false,

    })


};
