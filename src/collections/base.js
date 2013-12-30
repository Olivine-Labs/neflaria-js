var Q = require('q'),
    _ = require('lodash');

function BaseCollection(models){
  var model = this.model;

  this.models = models.map(function(data){
    return new model(data);
  });
}

BaseCollection.prototype.model = require('../models/base');

BaseCollection.prototype.toJSON = function(){
  return this.models.map(function(m){
    return m.toJSON();
  });
}

/* Classical inheritance helper, borrowed from coffeescript */

BaseCollection.__extends = function(child, parent){
  for(var key in parent){
    if(parent.hasOwnProperty(key)){
      child[key] = parent[key];
    }
  }

  function ctor(){
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  return child;
};

module.exports = BaseCollection;

