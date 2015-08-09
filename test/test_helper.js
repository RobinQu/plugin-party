var chai = require('chai');

chai.Assertion.addProperty('pluginEnabled', function () {
  var obj = chai.util.flag(this, 'object');
  ['register', 'unregister', 'hasPlugin', 'plugin'].forEach(function (name) {

    (new chai.Assertion(typeof obj[name] === 'function')).to.be.true;
  });
});
