var Base = require('../../src/models/base'),
    sinon = require('sinon'),
    chai = require('chai'),
    expect = require('chai').expect,
    sinonChai = require('sinon-chai');

var Q = require('q'),
    _ = require('lodash');

chai.use(sinonChai);
require('sinon-mocha').enhance(sinon);

describe('Base Object', function() {
  describe('constructor', function(){
    it('constructs with the expected API', function(){
      var base = new Base();
      expect(base.get).to.exist;
      expect(base.set).to.exist;
      expect(base.toJSON).to.exist;
      expect(base.toJSONString).to.exist;
    });
  });

  describe('getting and setting', function(){
    it('can get a value', function(){
      var base = new Base();
      base.attributes.coffee = true;
      expect(base.get('coffee')).to.be.true;
    });

    it('can set a value', function(done){
      var base = new Base();

      base.set({ coffee: true }).
        then(function(){
          expect(base.attributes.coffee).to.be.true;
          done();
        }).
        fail(function(err){
          done(err);
        });
    });

    it('fails if validation is bad', function(done){
      var base = new Base();

      base.validations.coffeeOunces = function(ounces){
        var defer = Q.defer();

        if(ounces >= 16){
          defer.resolve(ounces);
        }else{
          defer.reject('Must have at least 16 ounces.');
        }

        return defer.promise;
      }

      base.set({ coffeeOunces: 15 }).
        then(function(results){
          expect(base.attributes.coffeeOunces).to.be.undefined;
          expect(results[0].state).to.equal('rejected');
          expect(results[0].reason).to.equal('Must have at least 16 ounces.');
          done();
        }).fail(function(err){
          done(err);
        });
    });
  });
});

