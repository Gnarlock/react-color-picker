import React from 'react';
import Draggable from 'react-draggable';
import sliderLine from './images/sliderLine.svg';
import selectorIcon from './images/selector.png';
import './styles/Gradient.css';

const Color = require('color');

class HueSliderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: this.getSliderPositionFromColor()
    }

    this.getSliderPositionFromColor = this.getSliderPositionFromColor.bind(this);
    this.getHueFromSliderPosition = this.getHueFromSliderPosition.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.updateSliderPosition = this.updateSliderPosition.bind(this);
    this.updateHue = this.updateHue.bind(this);
  }

  getSliderPositionFromColor() {
    // TODO: Use size of bar (replace 255)
    const x = 0;
    const y = Math.round(255 * (this.props.color.hue() / 360));
    const position = {
      x: x,
      y: y
    }

    return position;
  }

  getHueFromSliderPosition() {
    // TODO: Use size of bar (replace 255)
    return Math.round(360 * Math.max(0, Math.min(255, this.state.position.y)) / 255);
  }

  handleMouseUp(event) {
    const x = this.state.position.x;
    const y = event.pageY - this.bar.offsetTop;

    this.updateSliderPosition(x, y);
  }

  handleDrag(event) {
    const position = this.slider.getBoundingClientRect();
    const x = this.state.position.x;
    const y = position.top - this.slider.offsetTop;

    this.updateSliderPosition(x, y);
  }

  updateSliderPosition(x, y) {
    const position = {
      x: x,
      y: y
    };

    this.setState({position: position}, this.updateHue);
  }

  updateHue() {
    const hue = this.getHueFromSliderPosition();
    let hsl = this.props.color.hsl().object();

    hsl.h = hue;

    this.props.onHueChange(hsl);
  }

  render() {
    const style = {
      slider: {
        backgroundColor: this.props.color.string()
      }
    }

    return (
      <div
        className="HueSliderBar">
        <div
          className="Bar"
          ref={(bar) => {this.bar = bar}}
          onMouseUp={this.MouseUp} />
        <Draggable 
          axis="y"
          // TODO: Use size of bar (replace 255)
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




class SaturationLightnessSelectorMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.getSelectorPositionFromColor()
    }

    this.getSelectorPositionFromColor = this.getSelectorPositionFromColor.bind(this);
    this.getSaturationFromSelectorPosition = this.getSaturationFromSelectorPosition.bind(this);
    this.getLightnessFromSelectorPosition = this.getLightnessFromSelectorPosition.bind(this);
    this.getSelectorPositionFromColor = this.getSelectorPositionFromColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.updateSaturationLightness = this.updateSaturationLightness.bind(this);
    this.updateSelectorPosition = this.updateSelectorPosition.bind(this);
  }

  // Calculations here aren't very accurate
  getSelectorPositionFromColor() {
    const x = 255 * (this.props.color.saturationl() / 100);
    const y = 255 - (255 * (this.props.color.lightness() / 100));
    const position = {
      x: x,
      y: y
    }

    return position;
  }

  getLightnessFromSelectorPosition() {
    // TODO: Use size of map (replace 255)
    return Math.round(100 * ((255 - this.state.position.y) / 255));
  }

  getSaturationFromSelectorPosition() {
    // TODO: Use size of map (replace 255)
    return Math.round(100 * (this.state.position.x / 255));
  }

  handleDrag(event) {
    const rect = this.selector.getBoundingClientRect();
    const x = rect.left - this.selector.offsetLeft;
    const y = rect.top - this.selector.offsetTop

    this.updateSelectorPosition(x, y);
  }

  handleClick(event) {
    const x = event.pageX - this.selector.offsetLeft;
    const y = event.pageY - this.selector.offsetTop;

    this.updateSelectorPosition(x, y);
  }

  updateSaturationLightness() {
    const saturation = this.getSaturationFromSelectorPosition();
    const lightness = this.getLightnessFromSelectorPosition();
    let hsl = this.props.color.hsl().object();

    hsl.s = saturation;
    hsl.l = lightness;

    this.props.onSaturationLightnessChange(hsl);
  }

  updateSelectorPosition(x, y) {
    const position = {
      x: x,
      y: y
    };

    this.setState({position: position}, this.updateSaturationLightness);
  }

  render() {
    // Background of ColorLayer is based only on hue. Use default saturation/lightness
    const hsl = {
      h: this.props.color.hue(),
      s: 100,
      l: 50
    };
    const color = Color(hsl);
    const backgroundColor = color.rgb().string();
    const filter = "invert(" + this.props.color.lightness() + "%)";
    const style = {
      colorLayer: {
        backgroundColor: backgroundColor
      },
      selector: {
        filter: filter
      }
    };

    return (
      <div
        className="SaturationLightnessSelectorMap" >
        <div
          className="Map"
          ref={(map) => {this.map = map}}
          style={style.colorLayer}
          onClick={this.handleClick} >
        </div>
        <Draggable
          axis="both"
          // TODO: Use size of map (replace 255)
          bounds={{left: 0, top: 0, right: 255, bottom: 255}}
          position={this.state.position}
          onDrag={this.handleDrag} >
          <img
            className="Selector"
            ref={(selector) => {this.selector = selector}}
            src={selectorIcon}
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
      <div
        className="Gradient">
        <SaturationLightnessSelectorMap
          color={this.props.color}
          onSaturationLightnessChange={this.props.onColorChange} />
        <HueSliderBar 
          color={this.props.color}
          onHueChange={this.props.onColorChange} />
      </div>
    );
	}
}