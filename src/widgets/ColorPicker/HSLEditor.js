import React from 'react';
import '../../styles/HSLEditor.css';

const Color = require('color');

// TODO: Fix bug where slider at max value resets itself to 0 position
class HueSliderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: this.getSliderPositionFromColor(),
      mouseButton: null
    }

    this.getHueFromSliderPosition = this.getHueFromSliderPosition.bind(this);
    this.getSliderPositionFromColor = this.getSliderPositionFromColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.updateSliderPosition = this.updateSliderPosition.bind(this);
    this.updateHue = this.updateHue.bind(this);
  }

  getHueFromSliderPosition() {
    return Math.round(360 * Math.max(0, Math.min(this.props.size.height, this.state.position.y)) / this.props.size.height);
  }

  getSliderPositionFromColor() {
    const x = 0;
    const y = Math.round(this.props.size.height * (this.props.color.hue() / 360));
    const position = {x: x, y: y}

    return position;
  }

  handleClick(event) {
    const x = this.state.position.x;
    const y = event.pageY - this.bar.offsetTop;

    this.updateSliderPosition(x, y);
  }
  handleMouseDown(event) {
    this.setState({mouseButton: event.button})
  }

  handleMouseMove(event) {
    event.preventDefault();
    
    if (this.state.mouseButton === 0) {
      const rect = this.slider.getBoundingClientRect();
      const x = this.state.position.x;
      const y = event.pageY - this.slider.offsetTop - (rect.height / 2);

      this.updateSliderPosition(x, y);
    }
  }

  handleMouseUp(event) {
    this.setState({mouseButton: null});
  }

  handleMouseLeave(event) {
    const rect = this.slider.getBoundingClientRect();
    const x = rect.left - this.slider.offsetLeft;
    const y = rect.top - this.slider.offsetTop;
    const xInBounds = (x < this.props.size.width) && (x >= 0);
    const yInBounds = (y < this.props.size.height) && (y > 0);

    if (!xInBounds || !yInBounds) {
      this.setState({mouseButton: null});
    }
  }

  handleWheel(event) {
    event.preventDefault(); // Don't scroll page

    let x = this.state.position.x;
    let y = this.state.position.y;

    if (event.deltaY < 0) {
      // Don't have negative y position
      y = Math.max(0, (y - 5));
    } else if (event.deltaY > 0) {
      // Don't have y greater than height of slider
      y = Math.min(this.props.size.height, (y + 5));
    }

    this.updateSliderPosition(x, y);
  }

  updateSliderPosition(x, y) {
    const position = {x: x, y: y};

    this.setState({position: position}, this.updateHue);
  }

  updateHue() {
    const hue = this.getHueFromSliderPosition();
    let hsl = this.props.color.hsl().object();

    hsl.h = hue;

    this.props.onHueChange(hsl);
  }

  shouldComponentUpdate(nextProps) {
    return (this.state.position.y < this.props.size.height);
  }

  render() {
    const position = this.getSliderPositionFromColor();
    const transformation = `translate(${position.x}px, ${position.y}px)`;

    const style = {
      bar: {
        height: this.props.size.height,
        width: 30
      },
      slider: {
        transform: transformation
      }
    }

    return (
      <div
        className="HueSliderBar">
        <div
          className="Bar"
          ref={(bar) => {this.bar = bar}}
          style={style.bar}
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
          onWheel={this.handleWheel} />
        <div
          className="Slider"
          ref={(slider) => {this.slider = slider}}
          style={style.slider}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
          onWheel={this.handleWheel} />
      </div>
    );
  }
}

class SaturationLightnessSelectorMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.getSelectorPositionFromColor(),
      mouseButton: null
    }

    this.getSaturationFromSelectorPosition = this.getSaturationFromSelectorPosition.bind(this);
    this.getLightnessFromSelectorPosition = this.getLightnessFromSelectorPosition.bind(this);
    this.getSelectorPositionFromColor = this.getSelectorPositionFromColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.updateSelectorPosition = this.updateSelectorPosition.bind(this);
    this.updateSaturationLightness = this.updateSaturationLightness.bind(this);
  }

  getSaturationFromSelectorPosition() {
    return Math.round(100 * (this.state.position.x / this.props.size.width));
  }

  getLightnessFromSelectorPosition() {
    return Math.round(100 * ((this.props.size.height - this.state.position.y) / this.props.size.height));
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

  handleClick(event) {
    const rect = this.selector.getBoundingClientRect();
    const x = event.pageX - this.selector.offsetLeft - (rect.width / 2);
    const y = event.pageY - this.selector.offsetTop - (rect.height / 2);

    this.updateSelectorPosition(x, y);
  }

  handleMouseDown(event) {
    this.setState({mouseButton: event.button})
  }

  // This could probably be optimized
  handleMouseMove(event) {
    event.preventDefault();
    
    if (this.state.mouseButton === 0) {
      const rect = this.selector.getBoundingClientRect();
      const x = event.pageX - this.selector.offsetLeft - (rect.width / 2);
      const y = event.pageY - this.selector.offsetTop - (rect.height / 2);

      this.updateSelectorPosition(x, y);
    }
  }

  handleMouseUp(event) {
    this.setState({mouseButton: null});
  }

  handleMouseLeave(event) {
    const rect = this.selector.getBoundingClientRect();
    const x = rect.left - this.selector.offsetLeft;
    const y = rect.top - this.selector.offsetTop;
    const xInBounds = (x < this.props.size.width) && (x > 0);
    const yInBounds = (y < this.props.size.height) && (y > 0);

    if (!xInBounds || !yInBounds) {
      this.setState({mouseButton: null});
    }
  }

  updateSelectorPosition(x, y) {
    const position = {
      x: Math.max(0, Math.min(this.props.size.width, x)),
      y: Math.max(0, Math.min(this.props.size.height, y))
    };

    this.setState({position: position}, this.updateSaturationLightness);
  }

  updateSaturationLightness() {
    const saturation = this.getSaturationFromSelectorPosition();
    const lightness = this.getLightnessFromSelectorPosition();
    let hsl = this.props.color.hsl().object();

    hsl.s = saturation;
    hsl.l = lightness;

    this.props.onSaturationLightnessChange(hsl);
  }

  shouldComponentUpdate(newProps) {
    return this.props.color !== newProps.color;
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

    const filter = "invert(" + this.props.color.lightness()/2 + "%)";

    const position = this.getSelectorPositionFromColor();
    const transformation = `translate(${position.x}px, ${position.y}px)`;

    const style = {
      map: {
        backgroundColor: backgroundColor,
        height: this.props.size.height || 255,
        width: this.props.size.width || 255
      },
      selector: {
        filter: filter,
        transform: transformation
      }
    };

    return (
      <div
        className="SaturationLightnessSelectorMap" >
        <div
          className="Map"
          ref={(map) => {this.map = map}}
          style={style.map}
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp} />
        <div
          className="Selector"
          ref={(selector) => {this.selector = selector}}
          style={style.selector}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave} />
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