import React from 'react';
import MedList from './MedList.jsx';


class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h1>Med-helper</h1>
        <div>
          <MedList/>
          <br/>
        </div>
      </div>
    )
  }
}

export default App;