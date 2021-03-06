# plugin-party

[![Build Status](https://travis-ci.org/RobinQu/plugin-party.svg?branch=master)](https://travis-ci.org/RobinQu/plugin-party)

A drop-in support for plugin mechanism.

## Usage

```
var installPlugin = require('plugin-party');


//Declare FooPlugin
var FooPlugin = function() {

};

//optional `configure` method
FooPlugin.prototype.configure = function(options) {

}

//Special properties on plugin class
FooPlugin.pluginType = 'foo';
FooPlugin.pluginName = 'bar';

//install plugin
var obj = {};
installPlugin(obj);

//register plugin
obj.register(FooPlugin);

//get a plugin instance
var plugin = obj.plugin('foo', 'bar');

//get again, with options
//as options are given, `configure` method is called
obj.plugin('foo', 'bar', {hello: 'world'});
```

More use case can be found in [test cases](test)

## License

MIT
