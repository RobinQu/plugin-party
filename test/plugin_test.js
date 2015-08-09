var pp = require('..');
var expect = require('chai').expect;

describe('Plugin creator', function () {


  it('should have static create method', function () {
    var Plugin = pp.plugin({
      type: 'foo',
      name: 'bar'
    });
    expect(Plugin.create).to.be.ok;
    var p = Plugin.create();
    expect(p).to.be.instanceof(Plugin);
  });

  it('should call configure if given', function () {
    var Plugin = pp.plugin({
      type: 'foo',
      name: 'bar',
      configure: function (options) {
        options = options || {};
        this.magic = options.magic || 'fireball';
      }
    });
    expect(Plugin.create).to.be.ok;
    var p = Plugin.create({magic: 'ice storm'});
    expect(p.magic).to.equal('ice storm');
  });

  it('should have save defaults', function () {
    var Plugin = pp.plugin({
      type: 'foo',
      name: 'bar'
    }, {
      nickname: 'teddy'
    });
    var p1 = Plugin.create();
    expect(p1.options.nickname).to.equal('teddy');
    p1.configure({nickname: 'tom'});
    expect(p1.options.nickname).to.equal('tom');
    var p2 = Plugin.create({nickname: 'tom'});
    expect(p2.options.nickname).to.equal('tom');
  });

});
