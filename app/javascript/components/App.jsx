import React from 'react'
import MedList from './MedList.jsx'
import Form from './Form'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    }
  }

  //when click, will alternate showForm to false or true.
  handleClick = (event) => {
    this.state.showForm ? this.setState({showForm: false}) : this.setState({showForm: true});
  }

  showForm = () => {
    return (
      <Form />
    )
  }

  render() {
    return (
      <div className="app">
        <h1>Med-helper</h1>
        <div>
          <MedList/>
          <br/>
          <button onClick={this.handleClick}>Add New</button>
          <br/>
          {this.state.showForm ? this.showForm() : null}
        </div>
      </div>
    )
  }
}

export default App;