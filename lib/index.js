var proto = require('./plugin_proto');
var _ = require('lodash');
var utils = require('./utils');

module.exports = function (target) {
  target.plugins = {};
  target.pluginInstances = {};
  _.extend(target, proto);
  return target;
};


module.exports.plugin = utils.plugin;

module.exports.isPlugin = utils.isPlugin;
