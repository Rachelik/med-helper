import React from 'react'
import MedList from './MedList.jsx'
import Form from './Form'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      meds: []
    }
  }

  appendPost(med) {
    const medArray = this.state.meds;
    medArray.push(med);
    this.setState({ meds: medArray })
  }

  render() {
    return (
      <div className="app">
        <h1>Med-helper</h1>
        <div>
          <MedList/>
          <Form
            appendPost={(med) => {
              this.appendPost(med);
            }}
          />
        </div>
      </div>
    )
  }
}

export default App;