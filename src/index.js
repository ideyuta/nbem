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
   * @param element - element separator
   * @param [modifier] - modifier separator
   */
  setSeparator(element: string, modifier: string = '--') {
    this.separator = {element, modifier};
  }
}

export const config = new Config();


/**
 * nbem
 */
export default function nbem(): (rawCls: string, staticClses?: string[] | string) => string {
  let clses = [];

  /**
   * nbem
   *
   * @param rawCls - raw classname
   * @param staticClses - static classes
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
 * @param clses - bem class tree
 * @param rawCls - raw classname
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
 * @param staticClses - static classnames
 */
function joinStaticClses(staticClses: string[]): string {
  if (staticClses.every(c => typeof c === 'string')) {
    return staticClses.join(' ');
  }
  return '';
}
