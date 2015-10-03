'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = nbem;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Config = (function () {
  function Config() {
    _classCallCheck(this, Config);

    this.separator = {
      element: '__',
      modifier: '--'
    };
  }

  _createClass(Config, [{
    key: 'setSeparator',
    value: function setSeparator(element) {
      var modifier = arguments.length <= 1 || arguments[1] === undefined ? '--' : arguments[1];

      this.separator = { element: element, modifier: modifier };
    }
  }]);

  return Config;
})();

var config = new Config();

exports.config = config;

function nbem() {
  var clses = [];

  function _nbem(rawCls) {
    var nests = rawCls.split('&');
    var length = nests.length - 1;
    clses[length] = nests[length];
    var cls = clses.map(function (c, key) {
      if (key <= length) {
        return c.split(':').join(config.separator.modifier);
      }
    }).join(config.separator.element);
    return cls;
  }

  return _nbem;
}
