import React from 'react';
import Draggable from 'react-draggable';
import './styles/Gradient.css';
import sliderLine from './images/sliderLine.svg';

const Color = require('color');

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
    return Math.round(255 * (this.props.color.hue() / 360));
  }
  calculateHueFromSliderPosition() {
    return Math.round(360 * Math.max(0, Math.min(255, this.state.position)) / 255);
  }
  handleSliderDrag(event) {
    const offsetTop = this.slider.offsetTop;
    const newPosition = this.slider.getBoundingClientRect().top - offsetTop;

    this.setState({position: newPosition })
    console.log("New position: " + this.state.position);

    const newHue = this.calculateHueFromSliderPosition();
    const newColor = Color.hsl(newHue, this.props.color.saturationl(), this.props.color.lightness());
    const rgb = newColor.rgb().array();

    this.props.onHueChange(rgb);
  }

  render() {
    const style = {
      slider: {
        backgroundColor: this.props.color.string(),
        // top: this.calculateSliderPositionFromHue() + "px"
      }
    }

    return (
      <div className="HueSliderBar">
        <div className="Bar" />
        <Draggable 
          axis="y"
          bounds={{top: 0, bottom: 255}}
          onDrag={this.handleSliderDrag} >
          <img
            className="Slider"
            ref={(slider) => {this.slider = slider}}
            style={style.slider}
            src={sliderLine}
            alt="slider" />
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
        <div
          className="Grid"
          style={styles.brightness} />
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