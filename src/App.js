import React, { Component } from 'react';
import './styles/App.css';
import ColorPicker from './widgets/ColorPicker/ColorPicker'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ColorPicker />
      </div>
    );
  }
}

export default App;
