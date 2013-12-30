module.exports = {
  models: {
    Base: require('./src/models/base'),
    News: require('./src/models/news'),
    Player: require('./src/models/player')
  },

  collections: {
    Base: require('./src/collections/base'),
    News: require('./src/collections/news'),
    Player: require('./src/collections/player')
  }
};

