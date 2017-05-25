import React, { Component } from 'react';
import './styles/ColorInfo.css';

class InputField extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    function isValidRGBInput(value) {
      const rgbValueRegex = /^[0-9]{0,3}$/i;
      return rgbValueRegex.test(value);
    }
    function isValidHexInput(value) {
      const rgbHexRegex = /^[0-9A-F]{0,6}$/i;
      return rgbHexRegex.test(value);
    }
    function sanitizeRGBInput(value) {
      return Math.min(Math.max(value, 0), 255); // Clamp value between 0 and 255
    }
    function sanitizeHexInput(value) {
      return value; // Not sure if anything needs to be done here
    }

    const inputValue = event.target.value;

    let sanitizedInputValue = null;
    if (this.props.type === "rgb" && isValidRGBInput(inputValue)) {
      sanitizedInputValue = sanitizeRGBInput(inputValue);
    } else if (this.props.type === "hex" && isValidHexInput(inputValue)) {
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
        <span className="InputFieldLabel">{this.props.label}</span>
        <input onChange={this.handleInputChange} type="text" value={this.props.value} spellCheck="false"  />
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

    let rgb = this.props.color.rgb;
    rgb[channel] = value;

    this.props.onRGBChange(rgb);
  }

  handleHexInputChange(input, value) {
    this.props.onHexChange(value);
  }

  render() {
    return (
      <div className="ColorInputs">
        <InputField onInputChange={this.handleRGBInputChange} type="rgb" label="R" channel="r" value={this.props.color.rgb.r} />
        <InputField onInputChange={this.handleRGBInputChange} type="rgb" label="G" channel="g" value={this.props.color.rgb.g} />
        <InputField onInputChange={this.handleRGBInputChange} type="rgb" label="B" channel="b" value={this.props.color.rgb.b} />
        <InputField onInputChange={this.handleHexInputChange} type="hex" label="#" key="hex" value={this.props.color.hex} />
      </div>
    );
  }
}

export default class ColorInfo extends Component {
  render() {
    const backgroundColor = `rgb(${this.props.color.rgb.r},${this.props.color.rgb.g},${this.props.color.rgb.b})`;

    return (
      <div className="ColorInfo">
        <div className="Swatch" style={{backgroundColor: backgroundColor}} />
        <ColorInputs onRGBChange={this.props.onRGBChange} onHexChange={this.props.onHexChange} color={this.props.color} />
      </div>
    );
  }
}