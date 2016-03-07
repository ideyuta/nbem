# nbem

> nbem is for intuitively write the class name of BEM method.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download-image]][npm-download-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

## Installation

```
npm i nbem
```

## Usage

##### Use with node.js, browserify, webpack:

```js
var nbem = require(nbem);
var bem = nbem();
```

'&' is indicates the nests.

```js
bem('header'); // => "header"
bem('&nav'); // => "header__nav"
bem('&&item'); // => "header__nav__item"
```

':' is indicates the modifier.

```js
bem('header:global'); // => "header--global"
bem('&nav'); // => "header--global__nav"
```

##### Join classnames:

Add a string or string[] at second argument.

```js
bem('header'); // => "header"
bem('&nav', 'isActive'); // => "header__nav isActive"
bem('&nav', ['isActive', 'isHover']); // => "header__nav isActive isHover"
bem('&&item'); // => "header__nav__item"
```

##### Customize separator:

```js
var config = require(nbem).config;
config.setSeparator('-', '_'); // element, modifier

bem('header:global'); // => "header-global"
bem('&title') // => "header-global_title"
```

## Example

in React of ES6

```js
import React from 'react';
import nbem from 'nbem';

export default class Header extends React.Component {
  render() {
    const bem = nbem();
    return (
      <header className={bem('header')}>
        <h1 className={bem('&title')}>Title</h1>
        <p className={bem('&description')>Description</p>
      </header>
    );
  }
}
```

Render:
```html
<header class="header">
  <h1 class="header__title">Title</h1>
  <p class="header__description">Description</p>
</header>
```

[npm-url]: https://www.npmjs.com/package/nbem
[npm-image]: https://img.shields.io/npm/v/nbem.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/nbem
[npm-download-image]: https://img.shields.io/npm/dt/nbem.svg?style=flat-square
[travis-url]: https://travis-ci.org/ideyuta/nbem
[travis-image]: https://img.shields.io/travis/ideyuta/nbem.svg?style=flat-square
[daviddm-url]: https://david-dm.org/ideyuta/nbem
[daviddm-image]: https://img.shields.io/david/ideyuta/nbem.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/ideyuta/nbem#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/ideyuta/nbem.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/nbem.svg?style=flat-square
