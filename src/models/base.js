var Q = require('q'),
    _ = require('lodash');

function Base(attrs){
  this.validations = {};
  this.attributes = {};

  if(attrs){
    this.set(attrs)
  }
}

// An asynchronous, promise-based method. Making this promise-based allows
// us to write asynchronous validation logic.

Base.prototype.set = function(attributes){
  var promises = [],
      promise, error;

  _.each(attributes, function(value, attribute){
    var defer = Q.defer();
        promises.push(defer.promise);

    if(this.validations[attribute]){
      this.validations[attribute](value).
        then(function(){
          this.attributes[attribute] = value;
          return defer.resolve(value);
        }).
        fail(function(err){
          return defer.reject(err);
        });
    }else{
      this.attributes[attribute] = value;
      return defer.resolve(value);
    }
  }, this);

  promise = Q.allSettled(promises);
  return promise;
};

Base.prototype.get = function(attribute){
  var defer = Q.defer();
  return this.attributes[attribute];
};

Base.prototype.toJSON = function(){
  return this.attributes;
};

Base.prototype.toJSONString = function(){
  return JSON.stringify(this.toJSON());
};

/* Classical inheritance helper, borrowed from coffeescript */

Base.__extends = function(child, parent){
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

module.exports = Base;

