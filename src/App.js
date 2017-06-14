import React, { Component } from 'react';
import './styles/App.css';
import ColorPicker from './widgets/ColorPicker/ColorPicker'

class App extends Component {
  render() {
    return (
      <div className="App">
      	<div className="TopControlBar" />
        <ColorPicker displayHSL={true} displayRGB={true} />
        <div className="BottomControlBar" />
      </div>
    );
  }
}

export default App;
