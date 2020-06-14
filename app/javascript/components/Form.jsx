import React from "react";
import axios from "axios";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      indication: "",
      frequency: "",
      time: "",
      dosage: "",
      date_start: "",
      duration: "",
      user_id: "",
      startDate: new Date()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeDate = (date) => {
    this.setState({ startDate: date })
  }

  onChangeIndicationSelect = (event) => {
    this.setState({ indication: event.target.value })
  }

  onChangeFrequencySelect = (event) => {
    this.setState({ frequency: event.target.value })
  }

  onChangeTimeSelect = (event) => {
    this.setState({ time: event.target.value })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      const url = "/meds.json";
      const payload = {
        name: this.state.name,
        indication: this.state.indication,
        frequency: this.state.frequency,
        time: this.state.time,
        dosage: this.state.dosage,
        date_start: this.state.startDate,
        duration: this.state.duration,
        user_id: this.state.user_id
      };

      axios
        .post(url, payload)
        .then(function (response) {
          let successMessage = document.querySelector('.success-message');
          successMessage.innerText = response.data.name + " added successfully";
        })
        .catch(function (error) {
          console.log(error);
          let successMessage = document.querySelector('.success-message');
          successMessage.innerHTML = JSON.stringify(error);
        });
      event.preventDefault();
      this.setState({name: '', indication: '', frequency: '', time: '', dosage: '', date_start: '', duration: '', user_id: ''})
    } else {
      let successMessage = document.querySelector('.success-message');
      successMessage.innerHTML = JSON.stringify('Name cannot be empty.');
      //NEED to check repeated content for the same date being submitted!!!!!!!!!!!!!!!!
    }
  }

  render() {
    const { name, indication, frequency, time, dosage, duration, user_id } = this.state;

    return (
      <div className="container-form">
        <form onSubmit = {this.handleSubmit}>
          <label> Name:<br/>
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </label><br/><br/>
          <label> Indication:<br/>
            <select onChange={this.onChangeIndicationSelect} defaultValue=''>
              <option value="">Please choose</option>
              <option value='Before food'>Before food</option>
              <option value='After food'>After food</option>
            </select>
          </label><br/><br/>
          <label> Frequency:<br/>
            <select onChange={this.onChangeFrequencySelect} defaultValue=''>
              <option value="">Please choose</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
            <span> intake(s) per day</span>
          </label><br/><br/>
          <label> Time <br/> (Choose Morning or Night, if Frequency is 1 intake per day):<br/>
            <select onChange={this.onChangeTimeSelect} defaultValue="">
              <option value="">Please choose</option>
              <option value='Morning'>Morning</option>
              <option value='Night'>Night</option>
            </select>
          </label><br/><br/>
          <label> Dosage:<br/>
            <input
              type="text"
              name="dosage"
              onChange={this.onChange}
              value={dosage}
            /><span> per intake</span>
          </label><br/><br/>
          <label> Date start:<br/>
            <DatePicker
              required
              selected={this.state.startDate}
              onChange={this.onChangeDate}
              className="rasta-stripes"
              placeholderText="Click to select a date."
              timeInputLabel="Time:"
              dateFormat="MMMM dd, yyyy h:mm aa"
              showTimeInput
              isClearable
            />
          </label><br/><br/>
          <label> Duration:<br/>
            <input
              type="number"
              name="duration"
              onChange={this.onChange}
              value={duration}
            /><span> day(s)</span>
          </label><br/><br/>

          <label> User:<br/>
            <input
              type="number"
              name="user_id"
              onChange={this.onChange}
              value={user_id}
            />
          </label><br/><br/>
          <br/>
          <div className="btn">
            <button type="submit">
              Add
            </button>
          </div>
          <br/>
          <div className="success-message">
            <label></label>
          </div>
        </form>
      </div>
    );
  }
}
