# redux-transform-keys

[![CircleCI][circleci-image]][circleci-url]
[![Codecov][codecov-image]][codecov-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

FSA-compliant transform keys of payload object for [Redux](http://redux.js.org/).

```bash
yarn add redux-transform-keys

# or

npm i redux-transform-keys
```

## FSA-compliant

Using in combination with [redux-actions](https://github.com/redux-utilities/redux-actions).

Because it supports FSA actions, you can use this in combination with redux-actions.

## Usage

```js
import { createStore, applyMiddleware, compose } from 'redux'
import transformKeys from 'redux-transform-keys'

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(transformKeys({ caseStyle: 'camelCase' }))
)

dispatch({
  type: 'RECIEVE_USER_ENTITY',
  payload: { user_id: 1, user_name: 'sugarshin' },
  meta: { transformKeys: true },
})
```

It's ignored on error.

### Run on error

```js
// You can use `ignoreOnError` option
const middleware = transformKeys({ caseStyle: 'camelCase', ignoreOnError: false })

dispatch({
  type: 'RECIEVE_USER_ENTITY',
  payload: new Error('some error'),
  meta: { transformKeys: true },
  error: true,
})
```

### Use transformers

```js
import { transformKeys, transformers } from 'redux-transform-keys'
const camelizeKeys = object => transformKeys(object, transformers.camelCase)
const subject = { f_o_o: 1, bar: { Buz: 3, Qu_x: [{ qu_uX: 4 }] } }
const expected = { fOO: 1, bar: { buz: 3, quX: [{ quUX: 4 }] } }
deepEqual(camelizeKeys(subject), expected)
```

You can use `'camelCase'` , `'snakeCase'` or `'kebabCase'` .

## License

[MIT][license-url]

© sugarshin

[circleci-image]: https://circleci.com/gh/sugarshin/redux-transform-keys/tree/master.svg?style=svg&circle-token=4456ba5b2897404d4250f610c1bb64ebef437a30
[circleci-url]: https://circleci.com/gh/sugarshin/redux-transform-keys/tree/master
[codecov-image]: https://codecov.io/gh/sugarshin/redux-transform-keys/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/sugarshin/redux-transform-keys
[npm-image]: https://img.shields.io/npm/v/redux-transform-keys.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/redux-transform-keys
[license-image]: https://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: https://sugarshin.mit-license.org/
