'use strict';

var checkHeader = require('./');
var checkIsHttpToken = checkHeader.validHeaderName;
var checkInvalidHeaderChar = function (x) { return !checkHeader.validHeaderValue(x); }

/**
 * should remain up to date with:
 *   https://github.com/nodejs/node/blob/master/test/parallel/test-http-common.js
 *   https://github.com/nodejs/node/blob/master/test/parallel/test-http-invalidheaderfield2.js
**/

const assert = require('assert');
const inspect = require('util').inspect;

// checkIsHttpToken
assert(checkIsHttpToken('t'));
assert(checkIsHttpToken('tt'));
assert(checkIsHttpToken('ttt'));
assert(checkIsHttpToken('tttt'));
assert(checkIsHttpToken('ttttt'));

assert.strictEqual(checkIsHttpToken(''), false);
assert.strictEqual(checkIsHttpToken(' '), false);
assert.strictEqual(checkIsHttpToken('あ'), false);
assert.strictEqual(checkIsHttpToken('あa'), false);
assert.strictEqual(checkIsHttpToken('aaaaあaaaa'), false);

// checkInvalidHeaderChar
assert(checkInvalidHeaderChar('あ'));
assert(checkInvalidHeaderChar('aaaaあaaaa'));

assert.strictEqual(checkInvalidHeaderChar(''), false);
assert.strictEqual(checkInvalidHeaderChar(1), false);
assert.strictEqual(checkInvalidHeaderChar(' '), false);
assert.strictEqual(checkInvalidHeaderChar(false), false);
assert.strictEqual(checkInvalidHeaderChar('t'), false);
assert.strictEqual(checkInvalidHeaderChar('tt'), false);
assert.strictEqual(checkInvalidHeaderChar('ttt'), false);
assert.strictEqual(checkInvalidHeaderChar('tttt'), false);
assert.strictEqual(checkInvalidHeaderChar('ttttt'), false);

// Good header field names
[
  'TCN',
  'ETag',
  'date',
  'alt-svc',
  'Content-Type',
  '0',
  'Set-Cookie2',
  'Set_Cookie',
  'foo`bar^',
  'foo|bar',
  '~foobar',
  'FooBar!',
  '#Foo',
  '$et-Cookie',
  '%%Test%%',
  'Test&123',
  'It\'s_fun',
  '2*3',
  '4+2',
  '3.14159265359'
].forEach(function(str) {
  assert.strictEqual(checkIsHttpToken(str),
                     true,
                     'checkIsHttpToken(' +
                       inspect(str) +
                       ') unexpectedly failed');
});
// Bad header field names
[
  ':',
  '@@',
  '中文呢', // unicode
  '((((())))',
  ':alternate-protocol',
  'alternate-protocol:',
  'foo\nbar',
  'foo\rbar',
  'foo\r\nbar',
  'foo\x00bar',
  '\x7FMe!',
  '{Start',
  '(Start',
  '[Start',
  'End}',
  'End)',
  'End]',
  '"Quote"',
  'This,That'
].forEach(function(str) {
  assert.strictEqual(checkIsHttpToken(str),
                     false,
                     'checkIsHttpToken(' +
                       inspect(str) +
                       ') unexpectedly succeeded');
});


// Good header field values
[
  'foo bar',
  'foo\tbar',
  '0123456789ABCdef',
  '!@#$%^&*()-_=+\\;\':"[]{}<>,./?|~`'
].forEach(function(str) {
  assert.strictEqual(checkInvalidHeaderChar(str),
                     false,
                     'checkInvalidHeaderChar(' +
                       inspect(str) +
                       ') unexpectedly failed');
});

// Bad header field values
[
  'foo\rbar',
  'foo\nbar',
  'foo\r\nbar',
  '中文呢', // unicode
  '\x7FMe!',
  'Testing 123\x00',
  'foo\vbar',
  'Ding!\x07'
].forEach(function(str) {
  assert.strictEqual(checkInvalidHeaderChar(str),
                     true,
                     'checkInvalidHeaderChar(' +
                       inspect(str) +
                       ') unexpectedly succeeded');
});

console.log('Tests pass.\n')
