var proto = module.exports = {};
var assert = require('assert');

proto.register = function (type, name, plugin) {
  if(typeof type === 'function') {
    plugin = type;
    name = plugin.pluginName;
    type = plugin.pluginType;
  }
  assert(name && type && plugin.create, 'should provide a valid plugin class');
  this.plugins[type + '_' + name] = plugin;
  return this;
};

proto.unregister = function (type, name) {
  if(typeof type === 'function') {//a plugin instance or class is passed
    name = type.pluginName;
    type = type.pluginType;
  }
  delete this.plugins[type + '_' + name];
};

proto.plugin = function (type, name, options) {
  assert(type && name, 'should provide type and name to get plugin');
  var id = type + '_' + name;
  var instance = this.pluginInstances[id];
  if(!instance) {
    instance = this.pluginInstances[id] = this.plugins[id].create(options);
  }
  if(options && instance.configure && typeof instance.configure === 'function') {
    instance.configure(options);
  }
  return instance;
};

proto.hasPlugin = function (type, name) {
  if(typeof type === 'function') {//a plugin instance or class is passed
    name = type.pluginName;
    type = type.pluginType;
  }
  var id = type + '_' + name;
  return this.plugins.hasOwnProperty(id)
};
