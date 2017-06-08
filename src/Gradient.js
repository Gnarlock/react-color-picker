import React from 'react';
import Draggable from 'react-draggable';
import './styles/Gradient.css';
import sliderLine from './images/sliderLine.svg';
import targetIcon from './images/target.png';

const Color = require('color');

class HueSliderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        x: 0,
        y: this.calculateSliderPositionFromCurrentColor()
      }
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
    return Math.round(360 * Math.max(0, Math.min(255, this.state.position.y)) / 255);
  }
  updateHue() {
    const hue = this.calculateHueFromSliderPosition();
    const hsl = {
      h: hue,
      s: this.props.color.saturationl(),
      l: this.props.color.lightness()
    };
    const color = Color.hsl(hsl);
    const rgb = color.rgb().array();

    this.props.onHueChange(rgb);
  }

  handleSliderDrag(dragEvent) {
    const sliderPosition = this.slider.getBoundingClientRect();
    const x = this.state.position.x;
    const y = sliderPosition.top - this.slider.offsetTop;

    const position = {
      x: x,
      y: y
    };

    this.setState({position: position}, this.updateHue);
  }
  handleBarClick(clickEvent) {
    const x = this.state.position.x;
    const y = clickEvent.pageY - this.bar.offsetTop;

    const position = {
      x: x,
      y: y
    };

    this.setState({position: position}, this.updateHue);
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
          position={this.state.position}
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




class BrightnessSelectorMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0
      }
    }

    this.handleDrag = this.handleDrag.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  calculateXFromHue() {

  }
  calculateYFromLightness() {

  }
  updateBrightness() {

  }
  handleDrag(dragEvent) {
    const rect = this.selector.getBoundingClientRect();
    const newX = rect.left - this.selector.offsetLeft;
    const newY = rect.top - this.selector.offsetTop
    const newPosition = {x: newX, y: newY}
    this.setState({position: newPosition}, this.updateBrightness);
  }
  handleClick(clickEvent) {

  }

  render() {
    return (
      <div className="BrightnessSelectorMap">
        <div className="BrightnessMap" onClick={this.handleClick} >
          <div className="ColorLayer" style={{backgroundColor: this.props.color.string()}} />
          <div className="DarknessLayer" />
          <div className="LightnessLayer" />
        </div>
        <Draggable
          axis="both"
          // Adjust bounds so the middle of image will intersect with corner of box
          bounds={{left: -5, top: -5, right: 250, bottom: 250}}
          position={this.state.position}
          onDrag={this.handleDrag} >
          <img
            className="Selector"
            ref={(selector) => {this.selector = selector}}
            src={targetIcon}
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
        <BrightnessSelectorMap onBrightnessChange={this.props.onColorChange} color={this.props.color} />
        <HueSliderBar onHueChange={this.props.onColorChange} color={this.props.color} />
      </div>
    );
	}
}