import React, { Component } from 'react';
import './styles/ColorPicker.css';
import Gradient from './Gradient';
import ColorInfo from './ColorInfo';

const rgbHex = require('rgb-hex');
const hexRgb = require('hex-rgb');

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {
        hex: 'ff0000',
        rgb: {
          r: 255,
          g: 0,
          b: 0
        } 
      }
    }

    this.handleRGBChange = this.handleRGBChange.bind(this);
    this.handleHexChange = this.handleHexChange.bind(this);
  }

  handleRGBChange(rgb) {
    const hex = rgbHex(rgb.r, rgb.g, rgb.b);
    const newColor = {
      hex: hex,
      rgb: rgb,
    }

    this.setState({color: newColor});
  }

  handleHexChange(hex) {
    const trailingZeros = new Array(6 - hex.length + 1).join("0");

    const rgbValues = hexRgb(hex.concat(trailingZeros));
    const rgb = {
      r: rgbValues[0],
      g: rgbValues[1],
      b: rgbValues[2]
    }
    const newColor = {
      hex: hex,
      rgb: rgb
    }

    this.setState({color: newColor});
  }

	render() {
		return (
      <div className="ColorPicker">
        <Gradient color={this.state.color} />
        <ColorInfo color={this.state.color} onRGBChange={this.handleRGBChange} onHexChange={this.handleHexChange} />
      </div>
    );
	}
}