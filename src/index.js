/* @flow */

/**
 * Config Class
 */
class Config {

  separator: {
    element: string,
    modifier: string
  };

  constructor() {
    this.init();
  }

  /**
   * Init Config
   */
  init() {
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
  setSeparator(element: string, modifier: string = '--') {
    this.separator = {element, modifier};
  }
}

export const config = new Config();


/**
 * nbem
 *
 * @return {function} nbem closure function
 */
export default function nbem(): (rawCls: string, staticClses?: string[] | string) => string {
  let clses = [];

  /**
   * nbem
   *
   * @param {string} rawCls - raw classname
   * @param {(string[]|string|null)} staticClses - static classes
   * @return {string} classname
   */
  function _nbem(rawCls: string, staticClses?: string[]|string): string {
    const ret = createBemClassName(clses, rawCls);
    clses = ret[0];
    if (typeof staticClses === 'string') {
      return `${ret[1]} ${staticClses}`;
    } else if (typeof staticClses === 'object' && staticClses instanceof Array) {
      const scls = joinStaticClses(staticClses);
      if (scls) {
        return `${ret[1]} ${scls}`;
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
function createBemClassName(clses: string[], rawCls: string): [string[], string] {
  const nests = rawCls.split('&');
  const length = nests.length - 1;
  const _clses = [].concat(clses);
  _clses[length] = nests[length];
  const cls = _clses.map((c, key) => {
    if (key <= length) {
      return c.split(':').join(config.separator.modifier);
    }
  }).filter(c => c).join(config.separator.element);
  return [_clses, cls];
}

/**
 * Join Static ClassNames
 *
 * @param {(string[]|string)} staticClses - static classnames
 * @return {string} static classnames
 */
function joinStaticClses(staticClses: string[]): string {
  if (staticClses.every(c => typeof c === 'string')) {
    return staticClses.join(' ');
  }
  return '';
}
