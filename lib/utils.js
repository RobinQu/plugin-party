var _ = require('lodash');

exports.plugin = function (options, defaults) {
  var P = function (opt) {
    this.options = _.defaults(opt || {}, defaults);
    this.configure = options.configure || function (options) {
      if(options) {
        _.extend(this.options, options);
      }
      return this;
    };
    this.configure(this.options);
  };
  P.pluginName = options.name;
  P.pluginType = options.type;
  P.create =  function (options) {
    return new P(options);
  };
  return P;
};


exports.isPlugin = function (P) {
  return P.pluginName && P.pluginType && P.create;
};
