const rgbDecimalRegex = RegExp('^[0-9]{0,3}$', 'i');
const rgbHexRegex = RegExp('^#[0-9A-F]{0,6}$', 'i');

module.exports = {
  rgbDecimalRegex: rgbDecimalRegex,
  rgbHexRegex: rgbHexRegex
}