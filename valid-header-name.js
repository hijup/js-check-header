/**
 * Verifies that the given val is a valid HTTP token
 * per the rules defined in RFC 7230
 * See https://tools.ietf.org/html/rfc7230#section-3.2.6
 *
**/
var token = new RegExp("^[a-zA-Z0-9_!#$%&'*+.^`|~-]+$")

function validHeaderName (x) {
  return typeof x === 'string' && token.test(x)
}

module.exports = validHeaderName
