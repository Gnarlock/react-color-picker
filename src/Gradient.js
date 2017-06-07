import React from 'react';
import Draggable from 'react-draggable';
import './styles/Gradient.css';
import sliderLine from './images/sliderLine.svg';

const Color = require('color');

class HueSliderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: this.calculateSliderPositionFromCurrentColor()
    }

    this.calculateSliderPositionFromCurrentColor = this.calculateSliderPositionFromCurrentColor.bind(this);
    this.calculateHueFromSliderPosition = this.calculateHueFromSliderPosition.bind(this);
    this.updateHue = this.updateHue.bind(this);
    this.handleSliderDrag = this.handleSliderDrag.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
  }

  calculateSliderPositionFromCurrentColor() {
    return Math.round(255 * (this.props.color.hue() / 360));
  }
  calculateHueFromSliderPosition() {
    return Math.round(360 * Math.max(0, Math.min(255, this.state.position)) / 255);
  }
  updateHue() {
    const newHue = this.calculateHueFromSliderPosition();
    const newColor = Color.hsl(newHue, this.props.color.saturationl(), this.props.color.lightness());
    const rgb = newColor.rgb().array();
    this.props.onHueChange(rgb);
  }

  handleSliderDrag(event) {
    const newPosition = this.slider.getBoundingClientRect().top - this.slider.offsetTop;
    this.setState({position: newPosition}, this.updateHue);
  }
  handleBarClick(event) {
    const newPosition = event.pageY - this.bar.offsetTop;
    this.setState({position: newPosition}, this.updateHue);
  }

  render() {
    return (
      <div className="HueSliderBar">
        <div
          className="Bar"
          ref={(bar) => {this.bar = bar}}
          onClick={this.handleBarClick} />
        <Draggable 
          axis="y"
          bounds={{top: 0, bottom: 255}}
          position={{x: 0, y: this.state.position}}
          onDrag={this.handleSliderDrag} >
          <img
            className="Slider"
            ref={(slider) => {this.slider = slider}}
            style={{backgroundColor: this.props.color.string()}}
            src={sliderLine}
            alt="slider" />
        </Draggable>
      </div>
    );
  }
}

class BrightnessGrid extends React.Component {
  render() {
    return (
      <div className="BrightnessGrid">
        <div
          className="Grid"
          style={{backgroundColor: this.props.color.string()}} />
        <Draggable
          axis="both" 
          bounds={{left: 0, top: 0, right: 255, bottom: 255}} >
          <img
            className="Selector"
            src={sliderLine}
            alt="selector" />
        </Draggable>
      </div>
    );
  }
}

export default class Gradient extends React.Component {
	render() {
		return (
      <div className="Gradient">
        <BrightnessGrid onBrightnessChange={this.props.onColorChange} color={this.props.color} />
        <HueSliderBar onHueChange={this.props.onColorChange} color={this.props.color} />
      </div>
    );
	}
}