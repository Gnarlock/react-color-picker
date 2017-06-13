import React, { Component } from 'react';
import Gradient from './Gradient';
import ColorInfo from './ColorInfo';
import './styles/ColorPicker.css';

const Color = require('color');

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: Color.rgb([255, 0, 0])
    }

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({
      color: Color(color)
    });
  }

	render() {
		return (
      <div className="ColorPicker">
        <Gradient color={this.state.color} onColorChange={this.handleColorChange} />
        <ColorInfo color={this.state.color} onColorChange={this.handleColorChange} />
      </div>
    );
	}
}