var plugin = require('..');
var expect = require('chai').expect;
var sinon = require('sinon');
// var assert = require('assert');

describe('Plugin mixin', function () {

  it('should install methods', function () {
    var target = {};
    plugin(target);
    expect(target).to.be.pluginEnabled;
  });

  var FooPlugin = function () {};
  FooPlugin.pluginType = 'foo';
  FooPlugin.pluginName = 'bar';
  FooPlugin.create = sinon.stub();
  FooPlugin.create.returns(new FooPlugin());

  beforeEach(function () {//reset stub each time
    FooPlugin.create.reset();
  });

  describe('register', function () {

    it('should register with plugin class', function () {
      var target = {};
      plugin(target);
      target.register(FooPlugin);
      expect(target.plugins[FooPlugin.pluginType + '_' + FooPlugin.pluginName] === FooPlugin).to.be.true;

    });

    it('should register with name, type, and plugin class', function () {
      var target = {};
      plugin(target);
      target.register('abc', 'bcd', FooPlugin);
      expect(target.plugins['abc_bcd'] === FooPlugin).to.be.true;
    });

    it('should reject un-compatiable object', function () {
      var target = {};
      plugin(target);
      expect(function () {
        target.register({});
      }).to.throw('AssertionError');
    });

  });

  describe('unregister', function () {

    it('should unregister', function () {
      var target = {};
      plugin(target);
      target.register(FooPlugin);
      expect(target.plugins[FooPlugin.pluginType + '_' + FooPlugin.pluginName] === FooPlugin).to.be.true;
      target.unregister(FooPlugin);
      expect(target.plugins[FooPlugin.pluginType + '_' + FooPlugin.pluginName] === FooPlugin).to.be.false;
    });

    it('sholud unregister with type and name', function () {
      var target = {};
      plugin(target);
      target.register(FooPlugin);
      expect(target.plugins[FooPlugin.pluginType + '_' + FooPlugin.pluginName] === FooPlugin).to.be.true;
      target.unregister(FooPlugin.pluginType, FooPlugin.pluginName);
      expect(target.plugins[FooPlugin.pluginType + '_' + FooPlugin.pluginName] === FooPlugin).to.be.false;
    });

  });

  describe('hasPlugin', function () {
    it('should detect if target has a plugin registred', function () {
      var target = {};
      plugin(target);
      target.register(FooPlugin);
      expect(target.hasPlugin(FooPlugin)).to.be.true;
      expect(target.hasPlugin(FooPlugin.pluginType, FooPlugin.pluginName)).to.be.true;
    });
  });

  describe('plugin', function () {

    it('should create a single instance for each plugin type', function () {
      var target = {};
      plugin(target);
      target.register(FooPlugin);
      var a = target.plugin('foo', 'bar');
      var b = target.plugin('foo', 'bar');
      expect(a).to.equal(b);
      expect(FooPlugin.create.callCount === 1).to.be.true;
    });

    it('should call configure method if any', function () {
      var target = {};
      plugin(target);
      target.register(FooPlugin);
      var p = target.plugin('foo', 'bar');
      p.configure = sinon.stub();
      p.configure.returnsArg(0);
      var opt = {hello: 'world'};
      target.plugin('foo', 'bar', opt);
      expect(p.configure.callCount).to.equal(1);
      expect(p.configure.firstCall.args[0]).to.deep.equal(opt);
    });


  });

});
