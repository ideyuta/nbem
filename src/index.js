class Config {
  constructor() {
    this.init();
  }

  init() {
    this.separator = {
      element: '__',
      modifier: '--'
    };
  }

  setSeparator(element, modifier = '--') {
    this.separator = {element, modifier};
  }
}

export const config = new Config();

export default function nbem() {
  const clses = [];

  function _nbem(rawCls) {
    const nests = rawCls.split('&');
    const length = nests.length - 1;
    clses[length] = nests[length];
    const cls = clses.map((c, key) => {
      if (key <= length) {
        return c.split(':').join(config.separator.modifier);
      }
    }).filter(c => c).join(config.separator.element);
    return cls;
  }

  return _nbem;
}
