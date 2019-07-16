const { List, Map } = require('immutable');

export default {
    gallery: Map({
        images: List(),
        openLightBox: false,
        activeImage: 0,
        activeFilter: List(),
        galleryWidth: 0
    }),
    app: Map({
      size: 200,
      tag: 'art',
      tags: List(),
      isConnected: false,
      isLoading: false,
      user: null,
      error: {}
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
