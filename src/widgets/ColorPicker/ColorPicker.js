import React from 'react';
import HSLEditor from './HSLEditor';
import RGBEditor from './RGBEditor';
import '../../styles/ColorPicker.css';

const Color = require('color');

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: Color.rgb([255, 0, 0])
    }

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({color: Color(color)});
  }

	render() {
		return (
      <div className="ColorPicker">
        <HSLEditor color={this.state.color} onColorChange={this.handleColorChange} size={{height: 510, width: 510}} />
        <RGBEditor color={this.state.color} onColorChange={this.handleColorChange} />
      </div>
    );
	}
}