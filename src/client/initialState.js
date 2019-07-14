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
      isConnected: null,
      isLoading: false,
      user: null
    }),
    error: Map({
        msg: {},
        status: null,
        id: null
    })
};
