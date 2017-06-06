import React from 'react';
import Draggable from 'react-draggable';
import './styles/Gradient.css';
import sliderLine from './images/sliderLine.svg';

// const Color = require('color');

class HueSliderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: this.calculateSliderPositionFromHue()
    }

    this.calculateSliderPositionFromHue = this.calculateSliderPositionFromHue.bind(this);
    this.calculateHueFromSliderPosition = this.calculateHueFromSliderPosition.bind(this);
    this.handleSliderDrag = this.handleSliderDrag.bind(this);
  }

  calculateSliderPositionFromHue() {
    // Height of slider bar * angle of color on a standard color wheel
    return Math.round(255 * (this.props.color.hsl().h / 360));
  }
  calculateHueFromSliderPosition() {
    return Math.round((360 * this.props.color.hsl().h) / 255);
  }
  handleSliderDrag(event) {
    this.calculateHueFromSliderPosition();
    return null;
  }

  render() {
    const style = {
      slider: {
        backgroundColor: this.props.color.string(),
        top: this.calculateSliderPositionFromHue() + "px"
      }
    }

    return (
      <div className="HueSliderBar">
        <div className="Bar" />
        <Draggable 
          axis="y"
          bounds={{top:0, bottom:255}}
          onStop={this.handleSliderDrag} >
          <img className="Slider"
            style={style.slider}
            src={sliderLine}
            alt="slider line" />
        </Draggable>
      </div>
    );
  }
}

class BrightnessGrid extends React.Component {
  render() {
    const styles = {
      brightness: {
        backgroundColor: this.props.color.string()
      }
    }

    return (
      <div className="BrightnessGrid">
        <div className="Grid" style={styles.brightness} />
        <Draggable
          axis="both"
          bounds={{left:0, top:0, right:255, bottom:255}}
          grid={[255,255]}>
          <img src={sliderLine} alt="crosshair" />
        </Draggable>
      </div>
    );
  }
}

export default class Gradient extends React.Component {
	render() {
		return (
      <div className="Gradient">
        <BrightnessGrid color={this.props.color} />
        <HueSliderBar color={this.props.color} />
      </div>
    );
	}
}