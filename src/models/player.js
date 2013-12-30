var Q = require('q'),
    Base = require('./base');

function Player(){
  return Player.__super__.constructor.apply(this, arguments);
}

Base.__extends(Player, Base);

module.exports = Player;

