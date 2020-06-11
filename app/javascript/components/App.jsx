import React from 'react'
import MedList from './MedList.jsx'
//import Form from './form'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h2>Med-helper</h2>
        <div>
          <MedList/>
        </div>
      </div>
    )
  }
}

export default App;