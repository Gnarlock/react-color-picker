import React, { Component } from 'react';
import './styles/App.css';
import ColorPicker from './widgets/ColorPicker/ColorPicker'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        { this.props.displayControls && 
            <div className="TopControlBar">
              <span>Color Picker</span>
              <button>x</button>
            </div>
        }

        <ColorPicker displayHSL={true} displayRGB={true} />

        { this.props.displayControls &&
            <div className="BottomControlBar" >
              <button>Submit</button>
            </div>
        }
      </div>
    );
  }
}

App.defaultProps = {
  displayControls: true
};
