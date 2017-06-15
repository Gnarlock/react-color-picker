import React, { Component } from 'react';
import './styles/App.css';
import ColorPicker from './widgets/ColorPicker/ColorPicker'

class App extends Component {
  render() {
    return (
      <div className="App">
      	<div className="TopControlBar">
      		<span>Color Picker</span>
          <button>x</button>
      	</div>

        <ColorPicker displayHSL={true} displayRGB={true} />

        <div className="BottomControlBar" >
        	<button>Cancel</button>
          <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
