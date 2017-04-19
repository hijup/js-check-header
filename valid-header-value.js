/**
 * True if x does not contain an invalid field-vchar
 *  field-value    = *( field-content / obs-fold )
 *  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 *  field-vchar    = VCHAR / obs-text
**/
function validHeaderValue (x) {
  for (var i = 0; i < x.length; i++) {
    var ch = x.charCodeAt(i)
    if (ch === 9) continue
    if (ch <= 31 || ch > 255 || ch === 127) return false
  }
  return true
}

module.exports = validHeaderValue
