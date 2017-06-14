import React from 'react';
import HSLEditor from './HSLEditor';
import RGBEditor from './RGBEditor';
import '../../styles/ColorPicker.css';

const Color = require('color');

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: Color.rgb({r: 255, g: 0, b: 0})
    }

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({color: Color(color)});
  }

	render() {
		return (
      <div className="ColorPicker">
        {this.props.displayHSL &&
          <HSLEditor
            size={this.props.HSLEditorSize}
            color={this.state.color}
            onColorChange={this.handleColorChange} />
        }
        {this.props.displayRGB &&
          <RGBEditor
            size={this.props.RGBEditorSize}
            color={this.state.color}
            onColorChange={this.handleColorChange} />
        }
      </div>
    );
	}
}

ColorPicker.defaultProps = {
  displayHSL: true,
  displayRGB: true,
  HSLEditorSize: {height: 255, width: 255},
  RGBEditorSize: {height: 255, width: 255}
};
