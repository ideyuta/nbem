/**
 * Config Class
 */
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

    this.init();
  }

  /**
   * Init Config
   */

  _createClass(Config, [{
    key: 'init',
    value: function init() {
      this.separator = {
        element: '__',
        modifier: '--'
      };
    }

    /**
     * Set Separator
     *
     * @param {string} element - element separator
     * @param {string} [modifier] - modifier separator
     */
  }, {
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
/**
 * nbem
 *
 * @return {function} nbem closure function
 */

function nbem() {
  var clses = [];

  /**
   * nbem
   *
   * @param {string} rawCls - raw classname
   * @param {(string[]|string|null)} staticClses - static classes
   * @return {string} classname
   */
  function _nbem(rawCls) {
    var staticClses = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var ret = createBemClassName(clses, rawCls);
    clses = ret[0];
    if (typeof staticClses === 'string') {
      return ret[1] + ' ' + staticClses;
    } else if (typeof staticClses === 'object' && staticClses instanceof Array) {
      var scls = joinStaticClses(staticClses);
      if (scls) {
        return ret[1] + ' ' + scls;
      }
    }
    return ret[1];
  }

  return _nbem;
}

/**
 * Create Bem Class Name
 *
 * @param {string[]} clses - bem class tree
 * @param {string} rawCls - raw classname
 * @return {[string[], string]} clses, classname
 */
function createBemClassName(clses, rawCls) {
  var nests = rawCls.split('&');
  var length = nests.length - 1;
  var _clses = [].concat(clses);
  _clses[length] = nests[length];
  var cls = _clses.map(function (c, key) {
    if (key <= length) {
      return c.split(':').join(config.separator.modifier);
    }
  }).filter(function (c) {
    return c;
  }).join(config.separator.element);
  return [_clses, cls];
}

/**
 * Join Static ClassNames
 *
 * @param {(string[]|string)} staticClses - static classnames
 * @return {string} static classnames
 */
function joinStaticClses(staticClses) {
  if (staticClses.every(function (c) {
    return typeof c === 'string';
  })) {
    return staticClses.join(' ');
  }
  return '';
}
