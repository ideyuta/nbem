import assert from 'assert';
import nbem from '../src/index';
import {config} from '../src/index';

/** @test {nbem} */
describe('nbem', () => {
  let bem = nbem();

  it('is closure', () => {
    assert(typeof bem === 'function');
  });

  it('should return className', () => {
    assert(bem('b') === 'b');
  });

  it('should return nested className', () => {
    assert(bem('&e') === 'b__e');
    assert(bem('&&e') === 'b__e__e');
  });

  it('should return modified className', () => {
    bem = nbem();
    bem('b');
    assert(bem('&e:m') === 'b__e--m');
    assert(bem('&&e:m') === 'b__e--m__e--m');
  });

  it('change separator', () => {
    bem = nbem();
    config.setSeparator('_', '-');
    bem('B');
    assert(bem('&e:m') === 'B_e-m');
    assert(bem('&&e:m') === 'B_e-m_e-m');
  });
});
