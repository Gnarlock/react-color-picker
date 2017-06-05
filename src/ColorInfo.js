import React, { Component } from 'react';
import './styles/ColorInfo.css';

class InputField extends React.Component {
  constructor(props) {
    super(props);

    this.rgbDecimalRegex = RegExp('^[0-9]{0,3}$', 'i');
    this.rgbHexRegex = RegExp('^#[0-9A-F]{0,6}$', 'i');

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();

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
    if (this.props.type === "rgb" && isValidInput(inputValue, this.rgbDecimalRegex)) {
      sanitizedInputValue = sanitizeRGBInput(inputValue);
    } else if (this.props.type === "hex" && isValidInput(inputValue, this.rgbHexRegex)) {
      sanitizedInputValue = sanitizeHexInput(inputValue);
    } else {
      return;
    }

    // Pass reference to this object so we can know which input was changed
    this.props.onInputChange(this, sanitizedInputValue);
  }

  render() {
    return (
      <div className="InputField">
        <span>{this.props.label}</span>
        <input onChange={this.handleInputChange} type="text" value={this.props.value || ""} spellCheck="false"  />
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
    let rgb = this.props.color.rgb();
    rgb[channel] = value;

    this.props.onRGBChange(rgb);
  }

  handleHexInputChange(input, value) {
    this.props.onHexChange(value);
  }

  render() {
    return (
      <div className="ColorInputs">
        <InputField onInputChange={this.handleRGBInputChange} type="rgb" label="R" channel="r" value={this.props.color.rgb().r} />
        <InputField onInputChange={this.handleRGBInputChange} type="rgb" label="G" channel="g" value={this.props.color.rgb().g} />
        <InputField onInputChange={this.handleRGBInputChange} type="rgb" label="B" channel="b" value={this.props.color.rgb().b} />
        <InputField onInputChange={this.handleHexInputChange} type="hex" label="#" key="hex" value={this.props.color.hexString()} />
      </div>
    );
  }
}

export default class ColorInfo extends Component {
  render() {
    const style = {
      backgroundColor: this.props.color.hslString()
    }

    return (
      <div className="ColorInfo">
        <div className="Swatch" style={style} />
        <ColorInputs onRGBChange={this.props.onRGBChange} onHexChange={this.props.onHexChange} color={this.props.color} />
      </div>
    );
  }
}