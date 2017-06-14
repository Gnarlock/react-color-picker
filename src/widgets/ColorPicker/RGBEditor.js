import React, { Component } from 'react';
import '../../styles/RGBEditor.css';

var HexRgb = require('hex-rgb');
var ColorUtil = require('../../utils/color');

class ColorInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInputChange(event) {
    function isValidInput(value, regex) {
      return regex.test(value);
    }
    function sanitizeRGBInput(value) {
      return Math.min(Math.max(value, 0), 255); // Clamp value between 0 and 255
    }
    function sanitizeHexInput(value) {
      const trailingZeros = new Array(6 - value.length + 1).join("0");
      return value.concat(trailingZeros);
    }

    const inputValue = event.target.value;

    let sanitizedInputValue = null;
    if (this.props.type === "rgb" && isValidInput(inputValue, ColorUtil.rgbDecimalRegex)) {
      sanitizedInputValue = sanitizeRGBInput(inputValue);
    } else if (this.props.type === "hex" && isValidInput(inputValue, ColorUtil.rgbHexRegex)) {
      sanitizedInputValue = sanitizeHexInput(inputValue);
    } else {
      return;
    }

    // Pass reference to this so we can know which input was changed
    this.props.onInputChange(this, sanitizedInputValue);
  }

  handleFocus(event) {
    this.setState({focused: true});
  }

  handleBlur(event) {
    this.setState({focused: false});
    if (this.props.type === "rgb") {
    }
  }

  render() {
    return (
      <div className="ColorInput">
        <span>{this.props.label}</span>
        <input
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleInputChange}
          value={this.props.value}
          type="text"
          spellCheck="false" />
      </div>
    );
  }
}

class ColorInputs extends React.Component {
  constructor(props) {
    super(props);

    this.handleRGBInputChange = this.handleRGBInputChange.bind(this);
    this.handleHexInputChange = this.handleHexInputChange.bind(this);
  }

  handleRGBInputChange(input, value) {
    const channel = input.props.channel;
    let rgb = this.props.color.rgb().object();

    rgb[channel] = value;

    this.props.onColorInputChange(rgb);
  }

  handleHexInputChange(input, value) {
    const rgbValues = HexRgb(value);
    const rgb = {
      r: rgbValues[0],
      g: rgbValues[1],
      b: rgbValues[2]
    }

    this.props.onColorInputChange(rgb);
  }

  render() {
    const values = {
      red: Math.round(this.props.color.red()),
      green: Math.round(this.props.color.green()),
      blue: Math.round(this.props.color.blue()),
      hex: this.props.color.hex()
    };

    return (
      <div className="ColorInputs">
        <ColorInput onInputChange={this.handleRGBInputChange} type="rgb" label="R" channel="r" value={values.red} />
        <ColorInput onInputChange={this.handleRGBInputChange} type="rgb" label="G" channel="g" value={values.green} />
        <ColorInput onInputChange={this.handleRGBInputChange} type="rgb" label="B" channel="b" value={values.blue} />
        <ColorInput onInputChange={this.handleHexInputChange} type="hex" label="#" value={values.hex} />
      </div>
    );
  }
}

export default class RGBEditor extends Component {
  render() {
    return (
      <div className="RGBEditor">
        <div className="Swatch" style={{backgroundColor: this.props.color.string()}} />
        <ColorInputs onColorInputChange={this.props.onColorChange} color={this.props.color} />
      </div>
    );
  }
}