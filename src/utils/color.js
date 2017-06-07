const channels = ["r","g","b"];
function getIndexOfChannel(channel) {
  return channels.indexOf(channel);
}

const rgbDecimalRegex = RegExp('^[0-9]{0,3}$', 'i');
const rgbHexRegex = RegExp('^#[0-9A-F]{0,6}$', 'i');

module.exports = {
  rgb: {
    channels: {
      array: channels,
      getIndex: getIndexOfChannel,
      names: {
        short: {
          red: "r",
          green: "g",
          blue: "b"
        },
        long: {
          r: "red",
          g: "green",
          b: "blue"
        }
      }
    }
  },
  rgbDecimalRegex: rgbDecimalRegex,
  rgbHexRegex: rgbHexRegex
}