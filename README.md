# check-header

Check if a header name or header value is valid.

https://tools.ietf.org/html/rfc7230#section-3.2.6

This is a simpler version of [node's internal optimized header validation](https://github.com/nodejs/node/blob/master/lib/_http_common.js) and should stay compatible with it. If the corresponding tests are not updated with node's tests, please open an issue or submit a PR.

## install

```sh
$ npm install check-header
```

## example

```js
import { validHeaderName, validHeaderValue } from 'check-header'

validHeaderName('foo') // => true
validHeaderName('@@') // => false

validHeaderValue('hey') // => true
validHeaderValue('中文呢') // => false
```
