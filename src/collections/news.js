var Q = require('q'),
    Base = require('./base');

function NewsCollection(){
  this.model = require('../models/news');

  return NewsCollection.__super__.constructor.apply(this, arguments);
}

Base.__extends(NewsCollection, Base);

module.exports = NewsCollection;

