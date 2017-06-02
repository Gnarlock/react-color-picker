import React, { Component } from 'react';
import './styles/Gradient.css';
import sliderLine from './images/sliderLine.svg';

class HueSlider extends Component {
  render() {
    const style = {
      slider: {
        top: '${0}px' // Calculate this
      }
    }

    return (
      <div className="HueSlider">
        <div className="Hue" />
        <img className="Slider" src={sliderLine} alt="slider line" />
      </div>
    );
  }
}

class BrightnessGrid extends Component {
  render() {
    const styles = {
      brightness: {
        backgroundColor: "#"+this.props.color.hex
      }
    }

    return (
      <div className="BrightnessGrid">
        <div className="Grid" style={styles.brightness} />
      </div>
    );
  }

}

export default class Gradient extends Component {
	render() {
		return (
      <div className="Gradient">
        <BrightnessGrid color={this.props.color} />
        <HueSlider value={this.props.color.rgb} />
      </div>
    );
	}
}