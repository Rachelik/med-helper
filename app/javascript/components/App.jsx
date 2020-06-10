import React from 'react'
import MedList from './MedList.jsx'
//import Form from './form'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Med-helper</h1>
        <div className="app">
          <MedList/>
        </div>
      </div>
    )
  }
}

export default App;