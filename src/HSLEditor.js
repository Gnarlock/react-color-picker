import React from 'react';
import Draggable from 'react-draggable';
import sliderLine from './images/sliderLine.svg';
import selectorIcon from './images/selector.png';
import './styles/HSLEditor.css';

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
    this.handleWheel = this.handleWheel.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.updateSliderPosition = this.updateSliderPosition.bind(this);
    this.updateHue = this.updateHue.bind(this);
  }

  getSliderPositionFromColor() {
    const x = 0;
    const y = Math.round(this.props.size.height * (this.props.color.hue() / 360));
    const position = {
      x: x,
      y: y
    }

    return position;
  }

  getHueFromSliderPosition() {
    return Math.round(360 * Math.max(0, Math.min(this.props.size.height, this.state.position.y)) / this.props.size.height);
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

  handleWheel(event) {
    let x = this.state.position.x;
    let y = this.state.position.y;

    if (event.deltaY < 0) {
      y = Math.max(0, (y - 1));
    } else if (event.deltaY > 0) {
      y = Math.min(this.props.size.height, (y + 1));
    }

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
      },
      bar: {
        height: this.props.size.height,
        width: 20
      }
    }

    return (
      <div
        className="HueSliderBar">
        <div
          className="Bar"
          ref={(bar) => {this.bar = bar}}
          style={style.bar}
          onMouseUp={this.handleMouseUp}
          onWheel={this.handleWheel} />
        <Draggable 
          axis="y"
          bounds={{top: 0, bottom: this.props.size.height}}
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

  getSelectorPositionFromColor() {
    const x = (this.props.size.width * (this.props.color.saturationl() / 100));
    const y = (this.props.size.height - (this.props.size.height * (this.props.color.lightness() / 100)));
    const position = {
      x: x,
      y: y
    }

    return position;
  }

  getLightnessFromSelectorPosition() {
    return Math.round(100 * ((this.props.size.height - this.state.position.y) / this.props.size.height));
  }

  getSaturationFromSelectorPosition() {
    return Math.round(100 * (this.state.position.x / this.props.size.width));
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
      map: {
        backgroundColor: backgroundColor,
        height: this.props.size.height || 255,
        width: this.props.size.width || 255
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
          style={style.map}
          onClick={this.handleClick} >
        </div>
        <Draggable
          axis="both"
          bounds={{left: 0, top: 0, right: this.props.size.width, bottom: this.props.size.height}}
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




export default class HSLEditor extends React.Component {
	render() {
		return (
      <div
        className="HSLEditor">
        <SaturationLightnessSelectorMap
          size={this.props.size}
          color={this.props.color}
          onSaturationLightnessChange={this.props.onColorChange} />
        <HueSliderBar
          size={this.props.size}
          color={this.props.color}
          onHueChange={this.props.onColorChange} />
      </div>
    );
	}
}