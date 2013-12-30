var Q = require('q'),
    Base = require('./base');

function PlayerCollection(){
  this.model = require('../models/player');

  return PlayerCollection.__super__.constructor.apply(this, arguments);
}

Base.__extends(PlayerCollection, Base);

module.exports = PlayerCollection;

