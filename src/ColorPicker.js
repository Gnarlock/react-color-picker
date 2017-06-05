import React, { Component } from 'react';
import './styles/ColorPicker.css';
import Gradient from './Gradient';
import ColorInfo from './ColorInfo';

const hexRgb = require('hex-rgb');
const Color = require('color');

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: Color({r:255, g:0, b:0})
    }

    this.handleRGBChange = this.handleRGBChange.bind(this);
    this.handleHexChange = this.handleHexChange.bind(this);
  }

  handleRGBChange(rgb) {
    this.setState({color: Color(rgb)});
  }

  handleHexChange(hex) {
    const rgbValues = hexRgb(hex);
    const rgb = {r:rgbValues[0], g:rgbValues[1], b:rgbValues[2]};

    this.setState({color: Color(rgb)});
  }

	render() {
		return (
      <div className="ColorPicker">
        <Gradient color={this.state.color} onRGBChange={this.handleRGBChange} />
        <ColorInfo color={this.state.color} onRGBChange={this.handleRGBChange} onHexChange={this.handleHexChange} />
      </div>
    );
	}
}