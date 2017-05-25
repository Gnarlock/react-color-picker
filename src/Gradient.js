import React, { Component } from 'react';
import './styles/Gradient.css';

export default class Gradient extends Component {
	render() {
		return (
      <div className="Gradient">
        <div className="Brightness" value={this.props.color.hsl} />
        <div className="Hue" value={this.props.color.rgb} />
      </div>
    );
	}
}