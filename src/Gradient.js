import React, { Component } from 'react';
import './styles/Gradient.css';
import sliderLine from './images/sliderLine.svg';

class HueSlider extends Component {
  constructor(props) {
    super(props);

    this.calculateSliderPosition = this.calculateSliderPosition.bind(this);
  }

  calculateSliderPosition() {
    let pos = 0;
    return pos;
  }

  render() {
    const style = {
      slider: {
        backgroundColor: `#${this.props.color.rgb}`,
        top: `${this.calculateSliderPosition()}px`
      }
    }

    return (
      <div className="HueSlider">
        <div className="Hue" />
        <img className="Slider" style={style.slider} src={sliderLine} alt="slider line" />
      </div>
    );
  }
}

class BrightnessGrid extends Component {
  render() {
    const styles = {
      brightness: {
        backgroundColor: `#${this.props.color.hex}`
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
        <HueSlider color={this.props.color} />
      </div>
    );
	}
}