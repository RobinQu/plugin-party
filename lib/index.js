var proto = require('./plugin_proto');
var _ = require('lodash');

module.exports = function (target) {
  target.plugins = {};
  target.pluginInstances = {};
  _.extend(target, proto);
  return target;
};
