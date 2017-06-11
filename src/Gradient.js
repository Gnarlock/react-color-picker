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
    // TODO: Use size of bar (replace 255)
    return Math.round(255 * (this.props.color.hue() / 360));
  }
  getHueFromSliderPosition() {
    // TODO: Use size of bar (replace 255)
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
      <div className="HueSliderBar">
        <div
          className="Bar"
          ref={(bar) => {this.bar = bar}}
          onClick={this.handleClick} />
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
    // TODO: Use size of map (replace 255)
    const lightness = (255 - Math.max(0, Math.min(255, this.state.position.y))) / 255; // Values 0 - 1
    const diminishingFactor = Math.min(2, (Math.max(0, (this.state.position.x / 255)) + 1)); // Values 1 - 2
    return Math.round(100 * (lightness / diminishingFactor)); // Values 0 - 100
  }
  getSaturationFromSelectorPosition() {
    // TODO: Use size of map (replace 255)
    return Math.round(100 * ((Math.max(0, Math.min(255, (this.state.position.x - 0)))) / 255));
  }
  updateLightness() {
    const saturation = this.getSaturationFromSelectorPosition();
    const lightness = this.getLightnessFromSelectorPosition();
    let hsl = this.props.color.hsl().object();

    hsl.s = saturation;
    hsl.l = lightness;

    this.props.onLightnessChange(hsl);
  }
  handleDrag(event) {
    const rect = this.selector.getBoundingClientRect();
    const x = rect.left - this.selector.offsetLeft;
    const y = rect.top - this.selector.offsetTop
    const position = {
      x: x,
      y: y
    }

    this.setState({position: position}, this.updateLightness);
  }
  handleClick(event) {
    const x = event.pageX - this.selector.offsetLeft;
    const y = event.pageY - this.selector.offsetTop;
    const position = {
      x: x,
      y: y
    };

    this.setState({position: position}, this.updateLightness);
  }

  render() {
    // Background of ColorLayer is based only on hue. Use default saturation/lightness
    const hsl = {
      h: this.props.color.hue(),
      s: 100,
      l: 50
    };
    const color = Color(hsl);
    const filter = "invert(" + this.props.color.lightness() + "%)";
    const style = {
      colorLayer: {
        backgroundColor: color.rgb().string()
      },
      selector: {
        filter: filter
      }
    };

    return (
      <div className="SaturationLightnessSelectorMap">
        <div
          className="Map"
          ref={(map) => {this.map = map}}
          onClick={this.handleClick} >
          <div className="ColorLayer" style={style.colorLayer} />
          <div className="DarkLayer" />
          <div className="LightLayer" />
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
      <div className="Gradient">
        <SaturationLightnessSelectorMap
          color={this.props.color}
          onLightnessChange={this.props.onColorChange} />
        <HueSliderBar 
          color={this.props.color}
          onHueChange={this.props.onColorChange} />
      </div>
    );
	}
}