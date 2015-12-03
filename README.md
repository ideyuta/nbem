# nbem

## Description

nbem is for intuitively write the class name of BEM method.

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

##### Customize separator:

```js
var config = require(nbem).config;
config.setSeparator('-', '_'); // element, modifier
header('header:global'); // => "header-global"
header('&title') // => "header-global_title"
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
