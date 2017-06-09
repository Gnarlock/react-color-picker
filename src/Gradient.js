import React from 'react';
import Draggable from 'react-draggable';
import sliderLine from './images/sliderLine.svg';
import targetIcon from './images/target.png';
import './styles/Gradient.css';

const Color = require('color');

class HueSliderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        x: 0,
        y: this.getSliderPositionFromColor()
      }
    }

    this.getSliderPositionFromColor = this.getSliderPositionFromColor.bind(this);
    this.getHueFromSliderPosition = this.getHueFromSliderPosition.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.updateHue = this.updateHue.bind(this);
  }

  getSliderPositionFromColor() {
    return Math.round(255 * (this.props.color.hue() / 360));
  }
  getHueFromSliderPosition() {
    return Math.round(360 * Math.max(0, Math.min(255, this.state.position.y)) / 255);
  }

  handleClick(event) {
    const x = this.state.position.x;
    const y = event.pageY - this.bar.offsetTop;

    const position = {
      x: x,
      y: y
    };

    this.setState({position: position}, this.updateHue);
  }
  handleDrag(event) {
    const sliderPosition = this.slider.getBoundingClientRect();
    const x = this.state.position.x;
    const y = sliderPosition.top - this.slider.offsetTop;

    const position = {
      x: x,
      y: y
    };

    this.setState({position: position}, this.updateHue);
  }

  updateHue() {
    const hue = this.getHueFromSliderPosition();
    const hsl = {
      h: hue,
      s: this.props.color.saturationl(),
      l: this.props.color.lightness()
    };
    const color = Color.hsl(hsl);
    const rgb = color.rgb().array();

    this.props.onHueChange(rgb);
  }

  render() {
    const style = {
      slider: {
        backgroundColor: this.props.color.string()
      }
    }

    return (
      <div className="HueSliderBar">
        <div
          className="Bar"
          ref={(bar) => {this.bar = bar}}
          onClick={this.handleClick} />
        <Draggable 
          axis="y"
          bounds={{top: 0, bottom: 255}}
          position={this.state.position}
          onDrag={this.handleDrag} >
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




class BrightnessSelectorMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0
      }
    }

    this.getSelectorPositionFromColor = this.getSelectorPositionFromColor.bind(this);
    this.getSaturationFromSelectorPosition = this.getSaturationFromSelectorPosition.bind(this);
    this.getLightnessFromSelectorPosition = this.getLightnessFromSelectorPosition.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.updateLightness = this.updateLightness.bind(this);
  }

  getSelectorPositionFromColor() {

  }
  getLightnessFromSelectorPosition() {
    return Math.round(100 * (255 - Math.max(0, Math.min(255, (this.state.position.y - 0)))) / 255);
  }
  getSaturationFromSelectorPosition() {
    return Math.round(100 * (Math.max(0, Math.min(255, (this.state.position.x - 0)))) / 255);
  }
  updateLightness() {
    const saturation = this.getSaturationFromSelectorPosition();
    const lightness = this.getLightnessFromSelectorPosition();

    const hsl = {
      h: this.props.color.hue(),
      s: saturation,
      l: lightness
    };
    const color = Color.hsl(hsl);
    const rgb = color.rgb().array();

    this.props.onLightnessChange(rgb);
  }
  handleDrag(event) {
    const rect = this.selector.getBoundingClientRect();
    const newX = rect.left - this.selector.offsetLeft;
    const newY = rect.top - this.selector.offsetTop
    const newPosition = {x: newX, y: newY}
    this.setState({position: newPosition}, this.updateLightness);
  }
  handleClick(event) {

  }

  render() {
    // Background of ColorLayer is based only on hue. Use default saturation/lightness
    const hsl = {
      h: this.props.color.hue(),
      s: 100,
      l: 50
    };
    const backgroundColor = Color.hsl(hsl);
    const selectorFilter = "invert(" + this.props.color.lightness() + "%)";
    const style = {
      colorLayer: {
        backgroundColor: backgroundColor
      },
      selector: {
        filter: selectorFilter
      }
    };

    return (
      <div className="BrightnessSelectorMap">
        <div className="Map" onClick={this.handleClick} >
          <div className="ColorLayer" style={style.colorLayer} />
          <div className="DarknessLayer" />
          <div className="LightnessLayer" />
        </div>
        <Draggable
          axis="both"
          bounds={{left: 0, top: 0, right: 255, bottom: 255}}
          position={this.state.position}
          onDrag={this.handleDrag} >
          <img
            className="Selector"
            ref={(selector) => {this.selector = selector}}
            src={targetIcon}
            alt="selector"
            style={style.selector} />
        </Draggable>
      </div>
    );
  }
}




export default class Gradient extends React.Component {
	render() {
		return (
      <div className="Gradient">
        <BrightnessSelectorMap
          color={this.props.color}
          onLightnessChange={this.props.onColorChange} />
        <HueSliderBar 
          color={this.props.color}
          onHueChange={this.props.onColorChange} />
      </div>
    );
	}
}