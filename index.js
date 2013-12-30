module.exports = {
  models: {
    Base: require('./src/models/base'),
    News: require('./src/models/news')
  },

  collections: {
    Base: require('./src/collections/base'),
    News: require('./src/collections/news')
  }
};

