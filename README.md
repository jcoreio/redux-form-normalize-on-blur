# redux-form-normalize-on-blur

[![Build Status](https://travis-ci.org/jcoreio/redux-form-normalize-on-blur.svg?branch=master)](https://travis-ci.org/jcoreio/redux-form-normalize-on-blur)
[![Coverage Status](https://codecov.io/gh/jcoreio/redux-form-normalize-on-blur/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/redux-form-normalize-on-blur)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/redux-form-normalize-on-blur.svg)](https://badge.fury.io/js/redux-form-normalize-on-blur)

a `redux-form` `Field` component that supports a `normalizeOnBlur` property

# Usage

```sh
npm install --save redux-form-normalize-on-blur
```

```js
const { Field } = require('redux-form-normalize-on-blur')
```

or

```js
const { Field } = require('redux-form-normalize-on-blur/immutable')
```

## Example

The following field will trim its text when it loses focus:

```js
<Field
  name="name"
  normalizeOnBlur={(value) => value && value.trim()}
  component={YourInputComponent}
/>
```

## API

### `Field`

Has the same API as `redux-form`'s `Field`, but it accepts an additional `normalizeOnBlur` property:

#### `normalizeOnBlur?: (value: any) => any`

Function that takes the current value and returns the normalized value.
NOTE: this happens before `parse` or `normalize`!
