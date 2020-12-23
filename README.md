# FP util lib

## Install

```sh
$ npm i hugomcm/util
```

## Usage

### Import

```javascript
const { R, F, S, $, T, M, H } = require('@hugomcm/util')

// R (Ramda);
// F (Fluture);
// S (Sanctuary);
// $ (Sanctuary Types);
// T (Time)*;
// M (Math)*;
// H (My own generic pointfree functions)*

// *May have some non pure functions
```

### Examples

```javascript
pr('Hello World!')
// Hello World!

const arr = ['a', 'b', 'c', 'd']
const i = S.pipe([
  //
  H.findIndex(v => v === 'c'),
  H.tap(),
])(arr)
// TAP#1: 2

pr(i)
// 2

const decimalPlaces = 2
pr(M.roundA(decimalPlaces)(1.2342))
// 1.23
```
