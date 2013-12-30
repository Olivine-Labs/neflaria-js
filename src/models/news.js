var Q = require('q'),
    Base = require('./base');

function News(){
  return News.__super__.constructor.apply(this, arguments);
}

Base.__extends(News, Base);

module.exports = News;

