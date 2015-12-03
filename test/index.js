import assert from 'assert';
import nbem from '../src/index';
import {config} from '../src/index';

/** @test {nbem} */
describe('nbem', () => {
  let bem = null;

  beforeEach(() => {
    config.init();
    bem = nbem();
  });

  it('is closure', () => {
    assert(typeof bem === 'function');
  });

  it('should return className', () => {
    assert(bem('b') === 'b');
  });

  it('should return nested className', () => {
    bem('b');
    assert(bem('&e') === 'b__e');
    assert(bem('&&e') === 'b__e__e');
    assert(bem('&e') === 'b__e');
  });

  it('should return modified className', () => {
    bem('b');
    assert(bem('&e:m') === 'b__e--m');
    assert(bem('&&e:m') === 'b__e--m__e--m');
  });

  it('change separator', () => {
    config.setSeparator('_', '-');
    bem('B');
    assert(bem('&e:m') === 'B_e-m');
    assert(bem('&&e:m') === 'B_e-m_e-m');
  });

  describe('should return bem className and static className', () => {
    it('is string', () => {
      bem('b');
      assert(bem('&e', 'a') === 'b__e a');
    });

    it('is string[]', () => {
      bem('b');
      assert(bem('&e', ['a', 'b']) === 'b__e a b');
    });

    it('isnt string or string[]', () => {
      bem('b');
      assert(bem('&e', 2) === 'b__e');
      assert(bem('&e', true) === 'b__e');
      assert(bem('&e', {a: 'b'}) === 'b__e');
      assert(bem('&e', [true, false]) === 'b__e');
      assert(bem('&e', ['a', false]) === 'b__e');
    });
  });
});
