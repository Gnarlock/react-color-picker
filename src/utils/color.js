var ColorUtil = function(obj) {
  var HSBToHex, HSBToRGB, HexToHSB, HexToRGB, RGBToHSB, RGBToHex, fixHex, fixRGB, formatRGBToBackground, getHSBFromPoint, getHueFromPos, getPointFromHSB, getPosFromHue, isValidHexValue, isValidRGBValue, parseHtmlRGB, parseRGBValue;
  RGBToHSB = function(rgb) {
    var delta, hsb, max, min;
    hsb = {
      h: 0,
      s: 0,
      b: 0
    };
    min = Math.min(rgb.r, rgb.g, rgb.b);
    max = Math.max(rgb.r, rgb.g, rgb.b);
    delta = max - min;
    hsb.b = max;
    hsb.s = max !== 0 ? 255 * delta / max : 0;
    if (hsb.s !== 0) {
      if (rgb.r === max) {
        hsb.h = (rgb.g - rgb.b) / delta;
      } else if (rgb.g === max) {
        hsb.h = 2 + (rgb.b - rgb.r) / delta;
      } else {
        hsb.h = 4 + (rgb.r - rgb.g) / delta;
      }
    } else {
      hsb.h = -1;
    }
    hsb.h *= 60;
    if (hsb.h < 0) {
      hsb.h += 360;
    }
    hsb.s *= 100 / 255;
    hsb.b *= 100 / 255;
    return {
      h: Math.round(hsb.h),
      s: Math.round(hsb.s),
      b: Math.round(hsb.b)
    };
  };
  HSBToRGB = function(hsb) {
    var h, rgb, s, t1, t2, t3, v;
    rgb = {};
    h = Math.round(hsb.h);
    s = Math.round(hsb.s * 255 / 100);
    v = Math.round(hsb.b * 255 / 100);
    if (s === 0) {
      rgb.r = rgb.g = rgb.b = v;
    } else {
      t1 = v;
      t2 = (255 - s) * v / 255;
      t3 = (t1 - t2) * (h % 60) / 60;
      if (h === 360) {
        h = 0;
      }
      if (h < 60) {
        rgb.r = t1;
        rgb.b = t2;
        rgb.g = t2 + t3;
      } else if (h < 120) {
        rgb.g = t1;
        rgb.b = t2;
        rgb.r = t1 - t3;
      } else if (h < 180) {
        rgb.g = t1;
        rgb.r = t2;
        rgb.b = t2 + t3;
      } else if (h < 240) {
        rgb.b = t1;
        rgb.r = t2;
        rgb.g = t1 - t3;
      } else if (h < 300) {
        rgb.b = t1;
        rgb.g = t2;
        rgb.r = t2 + t3;
      } else if (h < 360) {
        rgb.r = t1;
        rgb.g = t2;
        rgb.b = t1 - t3;
      } else {
        rgb.r = 0;
        rgb.g = 0;
        rgb.b = 0;
      }
    }
    return {
      r: Math.round(rgb.r),
      g: Math.round(rgb.g),
      b: Math.round(rgb.b)
    };
  };
  // RGBToHex = function(rgb) {
  //   var hex;
  //   hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
  //   $.each(hex, function(nr, val) {
  //     if (val.length === 1) {
  //       return hex[nr] = '0' + val;
  //     }
  //   });
  //   return hex.join('');
  // };
  HexToRGB = function(hex) {
    hex = parseInt((hex.indexOf('#') > -1 ? hex.substring(1) : hex), 16);
    return {
      r: hex >> 16,
      g: (hex & 0x00FF00) >> 8,
      b: hex & 0x0000FF
    };
  };
  HexToHSB = function(hex) {
    return RGBToHSB(HexToRGB(hex));
  };
  HSBToHex = function(hsb) {
    // return RGBToHex(HSBToRGB(hsb));
  };
  fixRGB = function(rgb) {
    return {
      r: Math.min(255, Math.max(0, rgb.r)),
      g: Math.min(255, Math.max(0, rgb.g)),
      b: Math.min(255, Math.max(0, rgb.b))
    };
  };
  fixHex = function(hex) {
    var i, len, o, _i, _ref;
    len = 6 - hex.length;
    if (len > 0) {
      o = [];
      for (i = _i = 0, _ref = len - 1; _i <= _ref; i = _i += 1) {
        o.push('0');
      }
      o.push(hex);
      hex = o.join('');
    }
    return hex;
  };
  formatRGBToBackground = function(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };
  parseHtmlRGB = function(str) {
    var rgb;
    rgb = str.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return {
      r: parseInt(rgb[1]),
      g: parseInt(rgb[2]),
      b: parseInt(rgb[3])
    };
  };
  parseRGBValue = function(value) {
    value = parseInt(value, 10);
    if (isNaN(value)) {
      return 0;
    }
    return Math.min(255, Math.max(0, value));
  };
  isValidRGBValue = function(value) {
    var val;
    val = parseInt(value, 10);
    if (isNaN(val)) {
      return false;
    }
    return val >= 0 && val <= 255;
  };
  isValidHexValue = function(hex) {
    return /(^[0-9A-Fa-f]{6}$)|(^[0-9A-Fa-f]{3}$)/i.test(hex);
  };
  getHSBFromPoint = function(shp, pnt) {
    var brightValue, satValue;
    brightValue = Math.round(100 * (shp.height - Math.max(0, Math.min(shp.height, pnt.y - shp.top))) / shp.height);
    satValue = Math.round(100 * (Math.max(0, Math.min(shp.width, pnt.x - shp.left))) / shp.width);
    return {
      h: brightValue,
      s: satValue,
      b: brightValue
    };
  };
  getHueFromPos = function(start, height, pos) {
    return Math.round(360 * (height - Math.max(0, Math.min(height, pos - start))) / height);
  };
  getPosFromHue = function(start, height, hue) {
    return Math.round(start + height - height * hue / 360);
  };
  getPointFromHSB = function(shp, hsb) {
    return {
      x: Math.round(shp.left + shp.width * hsb.s / 100),
      y: Math.round(shp.top + shp.height * (100 - hsb.b) / 100)
    };
  };
  return {
    RGBToHSB: RGBToHSB,
    HSBToRGB: HSBToRGB,
    // RGBToHex: RGBToHex,
    HexToRGB: HexToRGB,
    HSBToHex: HSBToHex,
    HexToHSB: HexToHSB,
    fixRGB: fixRGB,
    fixHex: fixHex,
    formatRGBToBackground: formatRGBToBackground,
    parseHtmlRGB: parseHtmlRGB,
    parseRGBValue: parseRGBValue,
    isValidHexValue: isValidHexValue,
    isValidRGBValue: isValidRGBValue,
    getHueFromPos: getHueFromPos,
    getHSBFromPoint: getHSBFromPoint,
    getPosFromHue: getPosFromHue,
    getPointFromHSB: getPointFromHSB
  };
}
